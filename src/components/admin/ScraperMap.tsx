import { useCallback, useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import type { GeoPoint, SearchArea } from '../../clients/scraper/leadTypes'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet-draw'

const DEFAULT_CENTER: GeoPoint = { lat: 48.137, lng: 11.575 }

const SHAPE_STYLE = {
  color: '#000000',
  fillColor: '#000000',
  fillOpacity: 0.06,
  weight: 2,
  dashArray: '6 4',
} as const

type DrawMode = 'circle' | 'freehand' | null

interface ScraperMapProps {
  area: SearchArea | null
  onAreaChange: (area: SearchArea | null) => void
}

function layerToSearchArea(layer: L.Layer): SearchArea | null {
  if (layer instanceof L.Circle) {
    const c = layer.getLatLng()
    return {
      type: 'circle',
      center: { lat: c.lat, lng: c.lng },
      radiusM: layer.getRadius(),
    }
  }
  if (layer instanceof L.Polygon) {
    const ring = layer.getLatLngs()[0] as L.LatLng[]
    if (!Array.isArray(ring) || ring.length < 3) return null
    return {
      type: 'polygon',
      points: ring.map((ll) => ({ lat: ll.lat, lng: ll.lng })),
    }
  }
  return null
}

function simplifyPath(map: L.Map, points: L.LatLng[], minDistM = 20): L.LatLng[] {
  if (points.length <= 3) return points
  const out = [points[0]]
  for (let i = 1; i < points.length; i++) {
    if (map.distance(out[out.length - 1], points[i]) >= minDistM) {
      out.push(points[i])
    }
  }
  const last = points[points.length - 1]
  if (out.length > 1 && map.distance(out[out.length - 1], last) >= minDistM / 2) {
    out.push(last)
  }
  return out.length >= 3 ? out : points.slice(0, 3)
}

function AreaLayer({ area }: { area: SearchArea | null }) {
  const map = useMap()
  const layerRef = useRef<L.Circle | L.Polygon | null>(null)

  useEffect(() => {
    if (layerRef.current) {
      map.removeLayer(layerRef.current)
      layerRef.current = null
    }
    if (!area) return

    if (area.type === 'circle') {
      layerRef.current = L.circle([area.center.lat, area.center.lng], {
        radius: area.radiusM,
        ...SHAPE_STYLE,
      }).addTo(map)
    } else if (area.type === 'polygon') {
      layerRef.current = L.polygon(
        area.points.map((p) => [p.lat, p.lng]),
        SHAPE_STYLE,
      ).addTo(map)
    }

    return () => {
      if (layerRef.current) map.removeLayer(layerRef.current)
    }
  }, [area, map])

  return null
}

function CircleDrawHandler({
  active,
  onDone,
}: {
  active: boolean
  onDone: (layer: L.Circle) => void
}) {
  const map = useMap()

  useEffect(() => {
    if (!active) return

    const drawer = new L.Draw.Circle(map as L.DrawMap, { shapeOptions: SHAPE_STYLE })
    drawer.enable()

    const onCreated = (e: L.LeafletEvent) => {
      drawer.disable()
      onDone((e as L.DrawEvents.Created).layer as L.Circle)
    }

    map.on(L.Draw.Event.CREATED, onCreated)
    return () => {
      drawer.disable()
      map.off(L.Draw.Event.CREATED, onCreated)
    }
  }, [active, map, onDone])

  return null
}

function pointerToLatLng(map: L.Map, e: PointerEvent): L.LatLng {
  const rect = map.getContainer().getBoundingClientRect()
  return map.containerPointToLatLng(
    L.point(e.clientX - rect.left, e.clientY - rect.top),
  )
}

function FreehandDrawHandler({
  active,
  onDone,
}: {
  active: boolean
  onDone: (layer: L.Polygon) => void
}) {
  const map = useMap()
  const pointsRef = useRef<L.LatLng[]>([])
  const previewRef = useRef<L.Polyline | null>(null)
  const drawingRef = useRef(false)
  const pointerIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!active) return

    const container = map.getContainer()
    container.style.cursor = 'crosshair'
    container.style.touchAction = 'none'
    map.doubleClickZoom.disable()
    map.touchZoom.disable()

    function finishDrawing() {
      if (!drawingRef.current) return
      drawingRef.current = false
      pointerIdRef.current = null
      map.dragging.enable()

      if (previewRef.current) {
        map.removeLayer(previewRef.current)
        previewRef.current = null
      }

      const simplified = simplifyPath(map, pointsRef.current)
      pointsRef.current = []

      if (simplified.length < 3) return
      onDone(L.polygon(simplified, SHAPE_STYLE))
    }

    function start(e: Event) {
      const pe = e as PointerEvent
      if (pe.pointerType === 'mouse' && pe.button !== 0) return
      if (drawingRef.current) return

      L.DomEvent.preventDefault(e)
      L.DomEvent.stopPropagation(e)

      drawingRef.current = true
      pointerIdRef.current = pe.pointerId
      container.setPointerCapture(pe.pointerId)

      const latlng = pointerToLatLng(map, pe)
      pointsRef.current = [latlng]
      previewRef.current = L.polyline([latlng], {
        color: '#000',
        weight: 2,
        dashArray: '4 4',
      }).addTo(map)
      map.dragging.disable()
    }

    function move(e: Event) {
      const pe = e as PointerEvent
      if (!drawingRef.current || !previewRef.current) return
      if (pointerIdRef.current !== null && pe.pointerId !== pointerIdRef.current) return

      L.DomEvent.preventDefault(e)
      pointsRef.current.push(pointerToLatLng(map, pe))
      previewRef.current.setLatLngs(pointsRef.current)
    }

    function end(e: Event) {
      const pe = e as PointerEvent
      if (pointerIdRef.current !== null && pe.pointerId !== pointerIdRef.current) return
      if (container.hasPointerCapture(pe.pointerId)) {
        container.releasePointerCapture(pe.pointerId)
      }
      finishDrawing()
    }

    L.DomEvent.on(container, 'pointerdown', start)
    L.DomEvent.on(container, 'pointermove', move)
    L.DomEvent.on(container, 'pointerup', end)
    L.DomEvent.on(container, 'pointercancel', end)

    return () => {
      container.style.cursor = ''
      container.style.touchAction = ''
      map.doubleClickZoom.enable()
      map.touchZoom.enable()
      map.dragging.enable()
      L.DomEvent.off(container, 'pointerdown', start)
      L.DomEvent.off(container, 'pointermove', move)
      L.DomEvent.off(container, 'pointerup', end)
      L.DomEvent.off(container, 'pointercancel', end)
      if (previewRef.current) map.removeLayer(previewRef.current)
    }
  }, [active, map, onDone])

  return null
}

function MapResizeFix() {
  const map = useMap()
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 100)
    return () => clearTimeout(t)
  }, [map])
  return null
}

function LocationPanHandler() {
  const map = useMap()
  useEffect(() => {
    const handler = (e: Event) => {
      const { lat, lng } = (e as CustomEvent<GeoPoint>).detail
      map.setView([lat, lng], 12, { animate: true })
    }
    window.addEventListener('scraper:pan-to', handler)
    return () => window.removeEventListener('scraper:pan-to', handler)
  }, [map])
  return null
}

export function ScraperMap({ area, onAreaChange }: ScraperMapProps) {
  const [mounted, setMounted] = useState(false)
  const [drawMode, setDrawMode] = useState<DrawMode>(null)
  const [locating, setLocating] = useState(false)
  const [geoError, setGeoError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const applyLayer = useCallback(
    (layer: L.Circle | L.Polygon) => {
      const next = layerToSearchArea(layer)
      if (next) onAreaChange(next)
      setDrawMode(null)
    },
    [onAreaChange],
  )

  function handleUseLocation() {
    if (!navigator.geolocation) {
      setGeoError('Standort nicht verfügbar in diesem Browser.')
      return
    }
    setLocating(true)
    setGeoError(null)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        window.dispatchEvent(
          new CustomEvent('scraper:pan-to', {
            detail: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          }),
        )
        setLocating(false)
      },
      () => {
        setGeoError('Standortzugriff verweigert oder nicht verfügbar.')
        setLocating(false)
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  if (!mounted) {
    return (
      <div className="flex h-[360px] items-center justify-center rounded-[4px] border-[3px] border-black bg-black/[0.02] font-display text-[10px] uppercase tracking-[0.15em] text-black/30">
        Karte lädt…
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-[4px] border-[3px] border-black">
      <MapContainer
        center={[DEFAULT_CENTER.lat, DEFAULT_CENTER.lng]}
        zoom={11}
        className="h-[360px] w-full"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapResizeFix />
        <LocationPanHandler />
        <AreaLayer area={area} />
        <CircleDrawHandler active={drawMode === 'circle'} onDone={applyLayer} />
        <FreehandDrawHandler active={drawMode === 'freehand'} onDone={applyLayer} />
      </MapContainer>

      <div className="flex flex-wrap items-center gap-2 border-t-[3px] border-black bg-black/[0.02] px-4 py-3">
        <button
          type="button"
          onClick={() => setDrawMode(drawMode === 'circle' ? null : 'circle')}
          className={`rounded-[4px] border-[3px] border-black px-3 py-1.5 font-display text-[9px] font-bold uppercase tracking-[0.1em] transition-colors ${drawMode === 'circle' ? 'bg-black text-white' : 'text-black hover:bg-black/[0.04]'}`}
        >
          Kreis
        </button>
        <button
          type="button"
          onClick={() => setDrawMode(drawMode === 'freehand' ? null : 'freehand')}
          className={`rounded-[4px] border-[3px] border-black px-3 py-1.5 font-display text-[9px] font-bold uppercase tracking-[0.1em] transition-colors ${drawMode === 'freehand' ? 'bg-black text-white' : 'text-black hover:bg-black/[0.04]'}`}
        >
          Freihand
        </button>
        {area && (
          <button
            type="button"
            onClick={() => {
              onAreaChange(null)
              setDrawMode(null)
            }}
            className="rounded-[4px] border-[3px] border-black px-3 py-1.5 font-display text-[9px] font-bold uppercase tracking-[0.1em] text-black/50 transition-colors hover:bg-black hover:text-white"
          >
            Löschen
          </button>
        )}
        <button
          type="button"
          onClick={handleUseLocation}
          disabled={locating}
          className="ml-auto rounded-[4px] border-[3px] border-black px-3 py-1.5 font-display text-[9px] font-bold uppercase tracking-[0.1em] text-black transition-colors hover:bg-black hover:text-white disabled:opacity-40"
        >
          {locating ? 'Standort…' : 'Mein Standort'}
        </button>
      </div>

      <p className="border-t border-black/10 px-4 py-2 font-display text-[10px] uppercase tracking-[0.12em] text-black/40">
        {drawMode === 'circle' && 'Kreis: Auf der Karte klicken und ziehen'}
        {drawMode === 'freehand' && 'Freihand: Mit Finger oder Maus um das Gebiet fahren'}
        {!drawMode && !area && 'Kreis oder Freihand wählen, dann Gebiet zeichnen'}
        {!drawMode && area && 'Gebiet gesetzt — neu zeichnen oder löschen'}
      </p>

      {geoError && (
        <p className="border-t border-black/10 px-4 py-2 font-display text-[10px] uppercase tracking-[0.1em] text-black/40">
          {geoError}
        </p>
      )}
    </div>
  )
}

export { DEFAULT_CENTER }

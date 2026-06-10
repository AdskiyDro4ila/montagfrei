import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import type { GeoPoint, SearchArea } from '../../clients/scraper/leadTypes'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet-draw'

const DEFAULT_CENTER: GeoPoint = { lat: 48.137, lng: 11.575 }

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
  if (layer instanceof L.Rectangle) {
    const b = layer.getBounds()
    return {
      type: 'rect',
      southWest: { lat: b.getSouth(), lng: b.getWest() },
      northEast: { lat: b.getNorth(), lng: b.getEast() },
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

function DrawTools({ onAreaChange }: { onAreaChange: (area: SearchArea | null) => void }) {
  const map = useMap()
  const groupRef = useRef<L.FeatureGroup | null>(null)
  const controlRef = useRef<L.Control.Draw | null>(null)

  useEffect(() => {
    const drawn = new L.FeatureGroup()
    groupRef.current = drawn
    map.addLayer(drawn)

    const drawControl = new L.Control.Draw({
      position: 'topright',
      draw: {
        polygon: { allowIntersection: false, showArea: true },
        rectangle: {},
        circle: {},
        polyline: false,
        marker: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawn,
        remove: true,
      },
    })
    controlRef.current = drawControl
    map.addControl(drawControl)

    function syncFromLayer() {
      const layers = drawn.getLayers()
      if (layers.length === 0) {
        onAreaChange(null)
        return
      }
      const area = layerToSearchArea(layers[layers.length - 1])
      onAreaChange(area)
    }

    map.on(L.Draw.Event.CREATED, (e: L.LeafletEvent) => {
      const event = e as L.DrawEvents.Created
      drawn.clearLayers()
      drawn.addLayer(event.layer)
      syncFromLayer()
    })

    map.on(L.Draw.Event.EDITED, syncFromLayer)
    map.on(L.Draw.Event.DELETED, () => onAreaChange(null))

    return () => {
      map.off(L.Draw.Event.CREATED)
      map.off(L.Draw.Event.EDITED)
      map.off(L.Draw.Event.DELETED)
      if (controlRef.current) map.removeControl(controlRef.current)
      map.removeLayer(drawn)
    }
  }, [map, onAreaChange])

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

export function ScraperMap({ area, onAreaChange }: ScraperMapProps) {
  const [mounted, setMounted] = useState(false)
  const [locating, setLocating] = useState(false)
  const [geoError, setGeoError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

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
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> · Geoapify'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapResizeFix />
        <LocationPanHandler />
        <DrawTools onAreaChange={onAreaChange} />
      </MapContainer>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t-[3px] border-black bg-black/[0.02] px-4 py-2">
        <p className="font-display text-[10px] uppercase tracking-[0.12em] text-black/40">
          {area
            ? 'Suchgebiet gezeichnet — bearbeiten oder neu zeichnen'
            : 'Rechteck, Kreis oder Polygon auf der Karte zeichnen'}
        </p>
        <button
          type="button"
          onClick={handleUseLocation}
          disabled={locating}
          className="rounded-[4px] border-[3px] border-black px-3 py-1 font-display text-[9px] font-bold uppercase tracking-[0.1em] text-black transition-colors hover:bg-black hover:text-white disabled:opacity-40"
        >
          {locating ? 'Standort…' : 'Mein Standort'}
        </button>
      </div>
      {geoError && (
        <p className="border-t border-black/10 px-4 py-2 font-display text-[10px] uppercase tracking-[0.1em] text-black/40">
          {geoError}
        </p>
      )}
    </div>
  )
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

export { DEFAULT_CENTER }

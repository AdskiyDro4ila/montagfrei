import { useEffect, useState } from 'react'
import { Circle, MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import type { GeoPoint } from '../../clients/scraper/leadTypes'
import 'leaflet/dist/leaflet.css'

const DEFAULT_CENTER: GeoPoint = { lat: 48.137, lng: 11.575 }

interface ScraperMapProps {
  center: GeoPoint
  radiusKm: number
  onCenterChange: (center: GeoPoint) => void
}

function MapClickHandler({ onCenterChange }: { onCenterChange: (c: GeoPoint) => void }) {
  useMapEvents({
    click(e) {
      onCenterChange({ lat: e.latlng.lat, lng: e.latlng.lng })
    },
  })
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

function MapRecenter({ center }: { center: GeoPoint }) {
  const map = useMap()
  useEffect(() => {
    map.setView([center.lat, center.lng], map.getZoom(), { animate: true })
  }, [center.lat, center.lng, map])
  return null
}

export function ScraperMap({ center, radiusKm, onCenterChange }: ScraperMapProps) {
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
        onCenterChange({ lat: pos.coords.latitude, lng: pos.coords.longitude })
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
      <div className="flex h-[320px] items-center justify-center rounded-[4px] border-[3px] border-black bg-black/[0.02] font-display text-[10px] uppercase tracking-[0.15em] text-black/30">
        Karte lädt…
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-[4px] border-[3px] border-black">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={11}
        className="h-[320px] w-full"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onCenterChange={onCenterChange} />
        <MapResizeFix />
        <MapRecenter center={center} />
        <Circle
          center={[center.lat, center.lng]}
          radius={radiusKm * 1000}
          pathOptions={{
            color: '#000000',
            fillColor: '#000000',
            fillOpacity: 0.06,
            weight: 2,
            dashArray: '6 4',
          }}
        />
      </MapContainer>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t-[3px] border-black bg-black/[0.02] px-4 py-2">
        <p className="font-display text-[10px] uppercase tracking-[0.12em] text-black/40">
          Klick = Mittelpunkt · {center.lat.toFixed(4)}, {center.lng.toFixed(4)}
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

export { DEFAULT_CENTER }

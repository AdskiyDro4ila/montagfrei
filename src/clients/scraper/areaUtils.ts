import type { GeoPoint, SearchArea } from './leadTypes'

export function areaCenter(area: SearchArea): GeoPoint {
  if (area.type === 'circle') return area.center
  if (area.type === 'rect') {
    return {
      lat: (area.southWest.lat + area.northEast.lat) / 2,
      lng: (area.southWest.lng + area.northEast.lng) / 2,
    }
  }
  const lat = area.points.reduce((s, p) => s + p.lat, 0) / area.points.length
  const lng = area.points.reduce((s, p) => s + p.lng, 0) / area.points.length
  return { lat, lng }
}

export function areaLabel(area: SearchArea): string {
  if (area.type === 'circle') {
    const km = Math.round((area.radiusM / 1000) * 10) / 10
    return `Kreis · ${km} km`
  }
  if (area.type === 'rect') return 'Rechteck'
  return `Polygon · ${area.points.length} Punkte`
}

export function toGeoapifyFilter(area: SearchArea): string {
  if (area.type === 'circle') {
    const { lng, lat } = area.center
    return `circle:${lng},${lat},${Math.round(area.radiusM)}`
  }
  const bounds = area.type === 'rect' ? area : polygonBounds(area.points)
  const lon1 = Math.min(bounds.southWest.lng, bounds.northEast.lng)
  const lat1 = Math.min(bounds.southWest.lat, bounds.northEast.lat)
  const lon2 = Math.max(bounds.southWest.lng, bounds.northEast.lng)
  const lat2 = Math.max(bounds.southWest.lat, bounds.northEast.lat)
  return `rect:${lon1},${lat1},${lon2},${lat2}`
}

function polygonBounds(points: GeoPoint[]): {
  southWest: GeoPoint
  northEast: GeoPoint
} {
  const lats = points.map((p) => p.lat)
  const lngs = points.map((p) => p.lng)
  return {
    southWest: { lat: Math.min(...lats), lng: Math.min(...lngs) },
    northEast: { lat: Math.max(...lats), lng: Math.max(...lngs) },
  }
}

export function isInsideArea(area: SearchArea, point: GeoPoint): boolean {
  if (area.type === 'circle') {
    return haversineM(area.center, point) <= area.radiusM
  }
  if (area.type === 'rect') {
    return (
      point.lat >= Math.min(area.southWest.lat, area.northEast.lat) &&
      point.lat <= Math.max(area.southWest.lat, area.northEast.lat) &&
      point.lng >= Math.min(area.southWest.lng, area.northEast.lng) &&
      point.lng <= Math.max(area.southWest.lng, area.northEast.lng)
    )
  }
  return pointInPolygon(point, area.points)
}

function haversineM(a: GeoPoint, b: GeoPoint): number {
  const R = 6371000
  const dLat = ((b.lat - a.lat) * Math.PI) / 180
  const dLng = ((b.lng - a.lng) * Math.PI) / 180
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))
}

function pointInPolygon(point: GeoPoint, polygon: GeoPoint[]): boolean {
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lng
    const yi = polygon[i].lat
    const xj = polygon[j].lng
    const yj = polygon[j].lat
    const intersect =
      yi > point.lat !== yj > point.lat &&
      point.lng < ((xj - xi) * (point.lat - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }
  return inside
}

export function distanceKm(from: GeoPoint, to: GeoPoint): number {
  return Math.round((haversineM(from, to) / 1000) * 10) / 10
}

export const SCRAPER_BRANCHES = [
  { id: 'reinigung', label: 'Gebäudereinigung / Putzfirma' },
  { id: 'garten', label: 'Gartenbau / Landschaftsbau' },
  { id: 'maler', label: 'Maler & Lackierer' },
  { id: 'hausmeister', label: 'Hausmeisterservice' },
  { id: 'elektriker', label: 'Elektriker' },
  { id: 'sanitaer', label: 'Sanitär / Heizung' },
  { id: 'schreiner', label: 'Schreiner / Tischler' },
  { id: 'dachdecker', label: 'Dachdecker' },
] as const

export type ScraperBranchId = (typeof SCRAPER_BRANCHES)[number]['id']

export interface GeoPoint {
  lat: number
  lng: number
}

export interface ScraperSearchParams {
  center: GeoPoint
  radiusKm: number
  branches: ScraperBranchId[]
}

export interface ScraperLead {
  id: string
  name: string
  branch: ScraperBranchId
  branchLabel: string
  address: string
  city: string
  phone?: string
  email?: string
  website?: string
  distanceKm: number
  lat: number
  lng: number
}

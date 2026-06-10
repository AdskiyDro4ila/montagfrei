import { areaCenter, distanceKm, isInsideArea, toGeoapifyFilter } from './areaUtils'
import {
  SCRAPER_BRANCHES,
  type ScraperBranchId,
  type ScraperLead,
  type ScraperSearchParams,
} from './leadTypes'

const BRANCH_LABEL = Object.fromEntries(
  SCRAPER_BRANCHES.map((b) => [b.id, b.label]),
) as Record<ScraperBranchId, string>

const BASE_CATEGORIES = 'commercial,office,service,building.commercial'

const BRANCH_SEARCH_TERMS: Record<ScraperBranchId, string[]> = {
  reinigung: ['Reinigung', 'Gebäudereinigung'],
  garten: ['Gartenbau', 'Landschaftsbau', 'Gärtnerei'],
  maler: ['Maler', 'Lackierer', 'Malerbetrieb'],
  hausmeister: ['Hausmeister', 'Hausmeisterservice'],
  elektriker: ['Elektriker', 'Elektroinstallateur'],
  sanitaer: ['Sanitär', 'Heizung', 'Installateur'],
  schreiner: ['Schreinerei', 'Tischler'],
  dachdecker: ['Dachdecker', 'Bedachung'],
}

/** Nur im Firmennamen — Kategorien von Geoapify sind oft zu allgemein. */
const BRANCH_NAME_KEYWORDS: Record<ScraperBranchId, RegExp> = {
  reinigung:
    /reinigung|putzerei|cleaning|gebäudereinigung|unterhaltsreinigung|facility.?clean/i,
  garten: /gartenbau|landschaftsbau|gärtner|gartenpflege|baumschul|galabau/i,
  maler: /maler|lackier|anstrich|fassaden|malerbetrieb/i,
  hausmeister: /hausmeister|objektbetreuung|facility.?service/i,
  elektriker: /elektriker|elektroinstall|elektromeister|elektro.?technik|elektroservice/i,
  sanitaer: /sanitär|heizung|installateur|klimatechnik|shk|badbau/i,
  schreiner: /schreinerei|tischlerei|schreiner|tischler(?!ei)/i,
  dachdecker: /dachdecker|bedachung|dachdeckerei/i,
}

const EXCLUDE_NAME =
  /museum|restaurant|café|cafe|hotel|hostel|bank|sparkasse|versicherung|fachverband|großhandel|grosshandel|akademie|universität|schule|kindergarten|kirche|apotheke|supermarkt|aldi|lidl|rewe|edeka|bmw|mercedes|volkswagen|porsche|audi/i

const ADDRESS_LIKE =
  /^\d{1,4}\s|^\d{1,4},|(?:straße|strasse|str\.|weg|platz|allee|gasse|ring|damm)\b/i

interface GeoapifyFeature {
  type: 'Feature'
  geometry: { type: 'Point'; coordinates: [number, number] }
  properties: {
    name?: string
    street?: string
    housenumber?: string
    city?: string
    postcode?: string
    phone?: string
    website?: string
    email?: string
    categories?: string[]
    formatted?: string
  }
}

interface GeoapifyResponse {
  features: GeoapifyFeature[]
}

interface PlaceFields {
  name: string
  address: string
  city: string
}

export class GeoapifyApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'GeoapifyApiError'
    this.status = status
  }
}

async function fetchPlaces(query: URLSearchParams): Promise<GeoapifyFeature[]> {
  const res = await fetch(`/api/places?${query}`)
  const text = await res.text()

  if (!res.ok) {
    let detail = `Places API Fehler (${res.status})`
    try {
      const err = JSON.parse(text) as { error?: string; message?: string }
      detail = err.message ?? err.error ?? detail
    } catch {
      if (text && !text.startsWith('<')) detail = text.slice(0, 200)
    }
    throw new GeoapifyApiError(detail, res.status)
  }

  const json = JSON.parse(text) as GeoapifyResponse
  return json.features ?? []
}

function parseFormatted(formatted?: string): { street: string; city: string } {
  if (!formatted) return { street: '', city: '' }
  const parts = formatted.split(',').map((p) => p.trim()).filter(Boolean)
  if (parts.length === 0) return { street: '', city: '' }

  const street = parts[0]
  const rest = parts.slice(1).find((p) => /\d{4,5}/.test(p) || /deutschland|germany/i.test(p) === false)
  const city = rest?.replace(/^\d{4,5}\s*/, '').trim() || parts[1] || ''
  return { street, city }
}

function resolvePlaceFields(props: GeoapifyFeature['properties']): PlaceFields | null {
  const rawName = props.name?.trim()
  const streetLine = [props.street, props.housenumber].filter(Boolean).join(' ').trim()
  const parsed = parseFormatted(props.formatted)
  const city = [props.postcode, props.city].filter(Boolean).join(' ').trim() || parsed.city

  let name = rawName ?? ''

  if (!name || ADDRESS_LIKE.test(name)) {
    if (streetLine && !ADDRESS_LIKE.test(streetLine)) {
      return null
    }
    return null
  }

  if (EXCLUDE_NAME.test(name)) return null

  const address = streetLine || parsed.street || '—'
  if (address !== '—' && name.toLowerCase() === address.toLowerCase()) return null

  return { name, address, city: city || '—' }
}

function matchBranchInName(
  name: string,
  searched: ScraperBranchId[],
  hint?: ScraperBranchId,
): ScraperBranchId | null {
  if (hint && BRANCH_NAME_KEYWORDS[hint].test(name)) return hint

  const matches = searched.filter((branch) => BRANCH_NAME_KEYWORDS[branch].test(name))
  if (matches.length === 1) return matches[0]
  if (matches.length > 1 && hint && matches.includes(hint)) return hint
  return null
}

function featureToLead(
  feature: GeoapifyFeature,
  params: ScraperSearchParams,
  center: { lat: number; lng: number },
  branch: ScraperBranchId,
  fields: PlaceFields,
): ScraperLead | null {
  const [lng, lat] = feature.geometry.coordinates
  const point = { lat, lng }
  if (!isInsideArea(params.area, point)) return null

  const props = feature.properties

  return {
    id: `geo-${lat.toFixed(5)}-${lng.toFixed(5)}-${slugify(fields.name)}`,
    name: fields.name,
    branch,
    branchLabel: BRANCH_LABEL[branch],
    address: fields.address,
    city: fields.city,
    phone: props.phone,
    email: props.email,
    website: props.website,
    distanceKm: distanceKm(center, point),
    lat,
    lng,
  }
}

export async function searchGeoapifyLeads(
  params: ScraperSearchParams,
): Promise<ScraperLead[]> {
  const filter = toGeoapifyFilter(params.area)
  const center = areaCenter(params.area)

  const requests: Promise<{ branch: ScraperBranchId; features: GeoapifyFeature[] }>[] = []

  for (const branch of params.branches) {
    for (const term of BRANCH_SEARCH_TERMS[branch]) {
      requests.push(
        fetchPlaces(
          new URLSearchParams({
            categories: BASE_CATEGORIES,
            filter,
            name: term,
            limit: '50',
            lang: 'de',
          }),
        ).then((features) => ({ branch, features })),
      )
    }
  }

  const batches = await Promise.all(requests)
  const seen = new Set<string>()
  const leads: ScraperLead[] = []

  for (const { branch: hint, features } of batches) {
    for (const feature of features) {
      const fields = resolvePlaceFields(feature.properties)
      if (!fields) continue

      const branch = matchBranchInName(fields.name, params.branches, hint)
      if (!branch) continue

      const [lng, lat] = feature.geometry.coordinates
      const key = `${fields.name}-${lat.toFixed(4)}-${lng.toFixed(4)}`
      if (seen.has(key)) continue
      seen.add(key)

      const lead = featureToLead(feature, params, center, branch, fields)
      if (lead) leads.push(lead)
    }
  }

  return leads.sort((a, b) => a.distanceKm - b.distanceKm)
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 24)
}

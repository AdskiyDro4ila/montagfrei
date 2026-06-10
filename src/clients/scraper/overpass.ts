import {
  SCRAPER_BRANCHES,
  type ScraperBranchId,
  type ScraperLead,
  type ScraperSearchParams,
} from './leadTypes'

const BRANCH_LABEL = Object.fromEntries(
  SCRAPER_BRANCHES.map((b) => [b.id, b.label]),
) as Record<ScraperBranchId, string>

/** OSM-Tag-Filter pro Branche */
const BRANCH_TAG_FILTERS: Record<ScraperBranchId, string[]> = {
  reinigung: ['["name"~"Reinigung|Gebäudereinigung|Putz",i]'],
  garten: ['["craft"="gardener"]', '["craft"="landscaper"]'],
  maler: ['["craft"="painter"]'],
  hausmeister: ['["office"="property_management"]', '["name"~"Hausmeister",i]'],
  elektriker: ['["craft"="electrician"]'],
  sanitaer: ['["craft"="plumber"]', '["craft"="hvac"]'],
  schreiner: ['["craft"="carpenter"]', '["craft"="joiner"]'],
  dachdecker: ['["craft"="roofer"]'],
}

interface OverpassElement {
  type: 'node' | 'way' | 'relation'
  id: number
  lat?: number
  lon?: number
  center?: { lat: number; lon: number }
  tags?: Record<string, string>
}

interface OverpassResponse {
  elements: OverpassElement[]
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function buildOverpassQuery(params: ScraperSearchParams): string {
  const radiusM = Math.round(params.radiusKm * 1000)
  const { lat, lng } = params.center
  const lines: string[] = []

  for (const branch of params.branches) {
    for (const filter of BRANCH_TAG_FILTERS[branch]) {
      lines.push(`  node(around:${radiusM},${lat},${lng})${filter};`)
      lines.push(`  way(around:${radiusM},${lat},${lng})${filter};`)
    }
  }

  return `[out:json][timeout:25];
(
${lines.join('\n')}
);
out center tags;`
}

function elementCoords(el: OverpassElement): { lat: number; lng: number } | null {
  if (el.lat != null && el.lon != null) return { lat: el.lat, lng: el.lon }
  if (el.center) return { lat: el.center.lat, lng: el.center.lon }
  return null
}

function tagPhone(tags: Record<string, string>): string | undefined {
  return tags.phone || tags['contact:phone'] || tags['contact:mobile']
}

function tagEmail(tags: Record<string, string>): string | undefined {
  return tags['contact:email'] || tags.email
}

function tagWebsite(tags: Record<string, string>): string | undefined {
  return tags.website || tags['contact:website'] || tags.url
}

function tagAddress(tags: Record<string, string>): { address: string; city: string } {
  const street = tags['addr:street'] ?? ''
  const nr = tags['addr:housenumber'] ?? ''
  const address = [street, nr].filter(Boolean).join(' ') || '—'
  const city = tags['addr:city'] || tags['addr:town'] || tags['addr:village'] || '—'
  return { address, city }
}

function detectBranch(tags: Record<string, string>, searched: ScraperBranchId[]): ScraperBranchId {
  const craft = tags.craft
  const name = (tags.name ?? '').toLowerCase()

  if (craft === 'painter') return 'maler'
  if (craft === 'gardener' || craft === 'landscaper') return 'garten'
  if (craft === 'electrician') return 'elektriker'
  if (craft === 'plumber' || craft === 'hvac') return 'sanitaer'
  if (craft === 'carpenter' || craft === 'joiner') return 'schreiner'
  if (craft === 'roofer') return 'dachdecker'
  if (tags.office === 'property_management' || name.includes('hausmeister')) return 'hausmeister'
  if (name.includes('reinigung') || name.includes('putz')) return 'reinigung'

  return searched[0]
}

export async function searchOverpassLeads(params: ScraperSearchParams): Promise<ScraperLead[]> {
  const query = buildOverpassQuery(params)
  const endpoint = '/api/overpass'

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `data=${encodeURIComponent(query)}`,
  })

  if (!res.ok) {
    throw new Error(`Overpass API Fehler (${res.status})`)
  }

  const json = (await res.json()) as OverpassResponse
  const seen = new Set<string>()
  const leads: ScraperLead[] = []

  for (const el of json.elements) {
    const tags = el.tags
    const coords = elementCoords(el)
    if (!tags?.name || !coords) continue

    const key = `${tags.name}-${coords.lat.toFixed(4)}`
    if (seen.has(key)) continue
    seen.add(key)

    const branch = detectBranch(tags, params.branches)
    const { address, city } = tagAddress(tags)
    const distanceKm = haversineKm(
      params.center.lat,
      params.center.lng,
      coords.lat,
      coords.lng,
    )

    if (distanceKm > params.radiusKm + 0.5) continue

    leads.push({
      id: `osm-${el.type}-${el.id}`,
      name: tags.name,
      branch,
      branchLabel: BRANCH_LABEL[branch],
      address,
      city,
      phone: tagPhone(tags),
      email: tagEmail(tags),
      website: tagWebsite(tags),
      distanceKm: Math.round(distanceKm * 10) / 10,
      lat: coords.lat,
      lng: coords.lng,
    })
  }

  return leads.sort((a, b) => a.distanceKm - b.distanceKm)
}

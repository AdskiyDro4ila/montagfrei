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

const BRANCH_CATEGORIES: Record<ScraperBranchId, string[]> = {
  reinigung: ['service.cleaning', 'commercial.laundry'],
  garten: ['commercial.landscaping', 'leisure.garden'],
  maler: ['commercial.craftsman', 'service.building'],
  hausmeister: ['service.building', 'commercial.property_management'],
  elektriker: ['commercial.craftsman', 'service.electrical'],
  sanitaer: ['commercial.craftsman', 'service.plumbing'],
  schreiner: ['commercial.craftsman', 'service.carpenter'],
  dachdecker: ['commercial.craftsman', 'service.roofer'],
}

const BRANCH_KEYWORDS: Record<ScraperBranchId, RegExp> = {
  reinigung: /reinigung|putz|clean|gebäude|cleaning/i,
  garten: /garten|landschaft|green|gärtner|landscap/i,
  maler: /maler|lack|paint|anstrich/i,
  hausmeister: /hausmeister|facility|objekt|property/i,
  elektriker: /elektro|electric|strom/i,
  sanitaer: /sanit|heiz|bad|plumb|hvac/i,
  schreiner: /schrein|tischl|carpenter|holz/i,
  dachdecker: /dach|roof|bedach/i,
}

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

function categoriesForBranches(branches: ScraperBranchId[]): string {
  const set = new Set<string>()
  for (const branch of branches) {
    for (const cat of BRANCH_CATEGORIES[branch]) set.add(cat)
  }
  return [...set].join(',')
}

function detectBranch(
  name: string,
  categories: string[] | undefined,
  searched: ScraperBranchId[],
): ScraperBranchId {
  const hay = `${name} ${(categories ?? []).join(' ')}`.toLowerCase()
  for (const branch of searched) {
    if (BRANCH_KEYWORDS[branch].test(hay)) return branch
  }
  return searched[0]
}

export async function searchGeoapifyLeads(
  params: ScraperSearchParams,
): Promise<ScraperLead[]> {
  const filter = toGeoapifyFilter(params.area)
  const categories = categoriesForBranches(params.branches)
  const center = areaCenter(params.area)

  const query = new URLSearchParams({
    categories,
    filter,
    limit: '500',
    lang: 'de',
  })

  const res = await fetch(`/api/places?${query}`)
  if (!res.ok) {
    throw new Error(`Places API Fehler (${res.status})`)
  }

  const json = (await res.json()) as GeoapifyResponse
  const seen = new Set<string>()
  const leads: ScraperLead[] = []

  for (const feature of json.features ?? []) {
    const props = feature.properties
    const name = props.name?.trim()
    if (!name) continue

    const [lng, lat] = feature.geometry.coordinates
    const point = { lat, lng }
    if (!isInsideArea(params.area, point)) continue

    const branch = detectBranch(name, props.categories, params.branches)

    const key = `${name}-${lat.toFixed(4)}`
    if (seen.has(key)) continue
    seen.add(key)

    const street = [props.street, props.housenumber].filter(Boolean).join(' ')
    const address = street || props.formatted?.split(',')[0]?.trim() || '—'
    const city = props.city || props.postcode || '—'

    leads.push({
      id: `geo-${lat.toFixed(5)}-${lng.toFixed(5)}-${slugify(name)}`,
      name,
      branch,
      branchLabel: BRANCH_LABEL[branch],
      address,
      city,
      phone: props.phone,
      email: props.email,
      website: props.website,
      distanceKm: distanceKm(center, point),
      lat,
      lng,
    })
  }

  return leads.sort((a, b) => a.distanceKm - b.distanceKm)
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 24)
}

import type { ScraperLead, ScraperSearchParams } from './leadTypes'
import { searchOverpassLeads } from './overpass'
import { searchMockLeads } from './searchLeadsMock'

export type ScraperSearchSource = 'osm' | 'mock'

export interface ScraperSearchResult {
  leads: ScraperLead[]
  source: ScraperSearchSource
}

/**
 * Sucht Firmen im Umkreis via OpenStreetMap (Overpass API).
 * Fallback auf Demo-Daten wenn API leer oder nicht erreichbar.
 */
export async function searchLeadsInRadius(
  params: ScraperSearchParams,
): Promise<ScraperSearchResult> {
  try {
    const results = await searchOverpassLeads(params)
    if (results.length > 0) {
      return { leads: results, source: 'osm' }
    }
  } catch {
    // Fallback unten
  }

  return { leads: await searchMockLeads(params), source: 'mock' }
}

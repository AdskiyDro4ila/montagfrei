import type { ScraperLead, ScraperSearchParams } from './leadTypes'
import { searchGeoapifyLeads } from './geoapify'
import { searchMockLeads } from './searchLeadsMock'

export type ScraperSearchSource = 'geoapify' | 'mock'

export interface ScraperSearchResult {
  leads: ScraperLead[]
  source: ScraperSearchSource
  /** Nur bei source=mock: API war nicht erreichbar */
  apiFailed?: boolean
}

/** Firmen im gezeichneten Gebiet via Geoapify Places API. */
export async function searchLeadsInArea(
  params: ScraperSearchParams,
): Promise<ScraperSearchResult> {
  try {
    const results = await searchGeoapifyLeads(params)
    return { leads: results, source: 'geoapify' }
  } catch {
    return {
      leads: await searchMockLeads(params),
      source: 'mock',
      apiFailed: true,
    }
  }
}

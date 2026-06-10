import type { ScraperLead, ScraperSearchParams } from './leadTypes'

import { GeoapifyApiError, searchGeoapifyLeads } from './geoapify'

import { searchMockLeads } from './searchLeadsMock'

export type ScraperSearchSource = 'geoapify' | 'mock'

export interface ScraperSearchResult {
  leads: ScraperLead[]
  source: ScraperSearchSource
  /** Nur bei source=mock: API war nicht erreichbar */
  apiFailed?: boolean
  apiError?: string
  apiStatus?: number
}

/** Firmen im gezeichneten Gebiet via Geoapify Places API. */
export async function searchLeadsInArea(
  params: ScraperSearchParams,
): Promise<ScraperSearchResult> {
  try {
    const results = await searchGeoapifyLeads(params)
    return { leads: results, source: 'geoapify' }
  } catch (err) {
    const apiError = err instanceof Error ? err.message : 'Unbekannter Fehler'
    const apiStatus = err instanceof GeoapifyApiError ? err.status : undefined

    return {
      leads: await searchMockLeads(params),
      source: 'mock',
      apiFailed: true,
      apiError,
      apiStatus,
    }
  }
}

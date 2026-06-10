import type { ClientData } from '../data/types'

/**
 * Scraper-Interface (Vorbereitung).
 * Später: Scraper liest Kunden-Website und liefert Partial<ClientData>.
 */
export interface ScraperResult {
  slug: string
  source: string
  scrapedAt: string
  /** Felder die der Scraper befüllt/aktualisiert */
  data: Partial<Pick<ClientData, 'business' | 'about' | 'services' | 'hours' | 'serviceArea'>>
}

export interface ScraperAdapter {
  scrape(websiteUrl: string): Promise<ScraperResult['data']>
}

import type { ClientSiteComponent } from './types'
import TemplateDemo from './_template/Demo'
import FischerHausDemo from './fischer-haus/Demo'
import MuellerReinigungDemo from './mueller-reinigung/Demo'
import SchmidtMalerDemo from './schmidt-maler/Demo'
import WeberGartenDemo from './weber-garten/Demo'

/**
 * Demo-Site Registry — slug → React-Komponente.
 * Neue Site: Komponente importieren und hier eintragen.
 */
const DEMO_SITES: Record<string, ClientSiteComponent> = {
  'mueller-reinigung': MuellerReinigungDemo,
  'weber-garten': WeberGartenDemo,
  'schmidt-maler': SchmidtMalerDemo,
  'fischer-haus': FischerHausDemo,
}

/** Scraper-Neukunden ohne eigene Demo nutzen die Standard-Vorlage */
export function getDemoSite(slug: string): ClientSiteComponent {
  return DEMO_SITES[slug] ?? TemplateDemo
}

export function hasDemoSite(slug: string): boolean {
  return slug in DEMO_SITES
}

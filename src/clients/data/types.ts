import type { AgentStatus, RecordStatus, ScraperStatus } from '../../types/admin'

/** Leistung — Basiswissen für Website und KI-Agent */
export interface ClientService {
  title: string
  description: string
}

/**
 * Kundendaten — Single Source of Truth für Scraper, Demo-Sites und KI-Agent.
 * Später füllt der Scraper business.phone, business.email, services usw.
 */
export interface ClientData {
  id: string
  status: RecordStatus
  slug: string
  code: string

  business: {
    name: string
    branch: string
    city: string
    phone: string
    email: string
    address?: string
    /** URL die der Scraper ausliest */
    website?: string
  }

  /** KI-Agent-Wissensbasis */
  about: string
  services: ClientService[]
  hours: string
  serviceArea?: string

  /** Optionale Anzeige-Inhalte — Demo-Builder dürfen nutzen oder ignorieren */
  display?: {
    hero?: { headline: string; subline: string }
    stats?: Array<{ value: string; label: string }>
    testimonial?: { quote: string; author: string }
  }

  scraper?: {
    source: string
    target: string
    status: ScraperStatus
    lastRun: string
    itemsFound: number
  }

  agent?: {
    model: string
    status: AgentStatus
    conversations: number
    lastActive: string
  }
}

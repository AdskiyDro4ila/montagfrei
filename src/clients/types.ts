import type { AgentStatus, RecordStatus, ScraperStatus } from '../types/admin'

export type ClientTemplate = 'reinigung' | 'garten' | 'maler' | 'hausmeister'

export interface ClientService {
  title: string
  description: string
}

export interface ClientStat {
  value: string
  label: string
}

/** Single source of truth per customer — demo, auth, and admin derive from this */
export interface ClientDefinition {
  id: string
  status: RecordStatus
  slug: string
  code: string
  template: ClientTemplate
  branch: string
  city: string
  business: {
    name: string
    phone: string
    email: string
  }
  hero: {
    headline: string
    subline: string
  }
  about: string
  services: ClientService[]
  hours: string
  stats: ClientStat[]
  testimonial: {
    quote: string
    author: string
  }
  agent?: {
    model: string
    status: AgentStatus
    conversations: number
    lastActive: string
  }
  scraper?: {
    source: string
    target: string
    status: ScraperStatus
    lastRun: string
    itemsFound: number
  }
}

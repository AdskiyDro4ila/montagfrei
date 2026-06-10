export type RecordStatus = 'active' | 'inactive' | 'pending'

export type ScraperStatus = 'idle' | 'running' | 'done' | 'error'

export type AgentStatus = 'online' | 'offline' | 'training'

export interface ClientRecord {
  id: string
  name: string
  branch: string
  code: string
  city: string
  status: RecordStatus
  /** Nur Scraper-Kunden (dyn-*) — später auch Supabase-Einträge */
  deletable: boolean
}

export interface ScraperJob {
  id: string
  clientName: string
  source: string
  target: string
  status: ScraperStatus
  lastRun: string
  itemsFound: number
}

export interface AgentRecord {
  id: string
  clientName: string
  branch: string
  model: string
  status: AgentStatus
  conversations: number
  lastActive: string
}

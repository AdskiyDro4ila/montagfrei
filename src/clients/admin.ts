import { isDeletableClient } from './data/repository'
import { getAllClients } from './registry'
import type { ScraperLead } from './scraper/leadTypes'
import type { AgentRecord, ClientRecord, ScraperJob } from '../types/admin'

export function getClientRecords(): ClientRecord[] {
  return getAllClients().map((c) => ({
    id: c.id,
    name: c.business.name,
    branch: c.business.branch,
    code: c.code,
    city: c.business.city,
    status: c.status,
    deletable: isDeletableClient(c.id),
  }))
}

export function isLeadAlreadyClient(lead: ScraperLead): boolean {
  return getAllClients().some(
    (c) =>
      c.business.name === lead.name ||
      (!!lead.phone && c.business.phone === lead.phone),
  )
}

export function getScraperJobs(): ScraperJob[] {
  return getAllClients()
    .filter((c) => c.scraper)
    .map((c) => ({
      id: c.id,
      clientName: c.business.name,
      source: c.scraper!.source,
      target: c.scraper!.target,
      status: c.scraper!.status,
      lastRun: c.scraper!.lastRun,
      itemsFound: c.scraper!.itemsFound,
    }))
}

export function getAgentRecords(): AgentRecord[] {
  return getAllClients()
    .filter((c) => c.agent)
    .map((c) => ({
      id: c.id,
      clientName: c.business.name,
      branch: c.business.branch,
      model: c.agent!.model,
      status: c.agent!.status,
      conversations: c.agent!.conversations,
      lastActive: c.agent!.lastActive,
    }))
}

export function getClientSlugByName(name: string): string | undefined {
  return getAllClients().find((c) => c.business.name === name)?.slug
}

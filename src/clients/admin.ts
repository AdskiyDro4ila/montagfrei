import { getAllClients } from './registry'
import type { AgentRecord, ClientRecord, ScraperJob } from '../types/admin'

/** Admin panel data — derived from client registry, not duplicated */

export function getClientRecords(): ClientRecord[] {
  return getAllClients().map((c) => ({
    id: c.id,
    name: c.business.name,
    branch: c.branch,
    code: c.code,
    city: c.city,
    status: c.status,
  }))
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
      branch: c.branch,
      model: c.agent!.model,
      status: c.agent!.status,
      conversations: c.agent!.conversations,
      lastActive: c.agent!.lastActive,
    }))
}

export function getClientSlugByName(name: string): string | undefined {
  return getAllClients().find((c) => c.business.name === name)?.slug
}

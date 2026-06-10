import type { ClientData } from '../data/types'
import { getAllClients } from '../registry'
import type { ScraperLead } from './leadTypes'

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 48)
}

function uniqueSlug(name: string): string {
  const base = slugify(name) || 'kunde'
  const taken = new Set(getAllClients().map((c) => c.slug))
  if (!taken.has(base)) return base
  let i = 2
  while (taken.has(`${base}-${i}`)) i++
  return `${base}-${i}`
}

export function leadToClientData(lead: ScraperLead): ClientData {
  const slug = uniqueSlug(lead.name)
  const now = new Date().toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return {
    id: `dyn-${Date.now()}`,
    status: 'pending',
    slug,
    code: slug,
    business: {
      name: lead.name,
      branch: lead.branchLabel,
      city: lead.city,
      phone: lead.phone ?? '',
      email: lead.email ?? '',
      address: lead.address,
      website: lead.website,
    },
    about: `${lead.name} in ${lead.city}.`,
    services: [
      {
        title: lead.branchLabel,
        description: 'Leistungen werden nach Erstgespräch ergänzt.',
      },
    ],
    hours: 'Mo–Fr nach Vereinbarung',
    serviceArea: lead.city,
    scraper: {
      source: 'OSM Lead-Suche',
      target: 'Kontakt, Branche, Standort',
      status: 'done',
      lastRun: now,
      itemsFound: 1,
    },
    agent: {
      model: 'Anfragen',
      status: 'offline',
      conversations: 0,
      lastActive: '—',
    },
  }
}

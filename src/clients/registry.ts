import { CLIENT_DEFINITIONS } from './definitions'
import type { ClientDefinition } from './types'
import type { DemoContent } from '../demos/types'

const bySlug = new Map(CLIENT_DEFINITIONS.map((c) => [c.slug, c]))
const byCode = new Map(CLIENT_DEFINITIONS.map((c) => [c.code, c]))

/** Legacy alias */
byCode.set('montagfrei', bySlug.get('mueller-reinigung')!)

export function getAllClients(): ClientDefinition[] {
  return CLIENT_DEFINITIONS
}

export function getClientBySlug(slug: string): ClientDefinition | undefined {
  return bySlug.get(slug)
}

export function getClientByCode(code: string): ClientDefinition | undefined {
  return byCode.get(code.trim().toLowerCase())
}

export function toDemoContent(client: ClientDefinition): DemoContent {
  return {
    slug: client.slug,
    code: client.code,
    template: client.template,
    branch: client.branch,
    business: {
      name: client.business.name,
      city: client.city,
      phone: client.business.phone,
      email: client.business.email,
    },
    hero: client.hero,
    about: client.about,
    services: client.services,
    hours: client.hours,
    stats: client.stats,
    testimonial: client.testimonial,
  }
}

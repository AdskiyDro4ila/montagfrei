import { getAllClients, getClientByCode, getClientBySlug, toDemoContent } from '../clients/registry'
import type { DemoContent } from './types'

export function getDemoBySlug(slug: string): DemoContent | undefined {
  const client = getClientBySlug(slug)
  return client ? toDemoContent(client) : undefined
}

export function getDemoSlugByCode(code: string): string | undefined {
  return getClientByCode(code)?.slug
}

export function getAllDemos(): DemoContent[] {
  return getAllClients().map(toDemoContent)
}

export const DEMO_SLUGS = getAllClients().map((c) => c.slug)

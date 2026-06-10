import { getAllClients, getClientByCode, getClientBySlug } from '../clients/registry'

export function getClientDataBySlug(slug: string) {
  return getClientBySlug(slug)
}

export function getDemoSlugByCode(code: string): string | undefined {
  return getClientByCode(code)?.slug
}

export const DEMO_SLUGS = getAllClients().map((c) => c.slug)

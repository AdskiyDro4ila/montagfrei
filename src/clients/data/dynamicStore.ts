import type { ClientData } from './types'

const STORAGE_KEY = 'montagfrei_dynamic_clients'
export const DYNAMIC_CLIENT_ID_PREFIX = 'dyn-'

export function getDynamicClients(): ClientData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as ClientData[]
  } catch {
    return []
  }
}

export function addDynamicClient(client: ClientData): void {
  const existing = getDynamicClients()
  if (existing.some((c) => c.slug === client.slug || c.code === client.code)) {
    throw new Error('Kunde mit diesem Slug existiert bereits.')
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, client]))
}

export function slugExists(slug: string): boolean {
  return getDynamicClients().some((c) => c.slug === slug)
}

export function isDynamicClientId(id: string): boolean {
  return id.startsWith(DYNAMIC_CLIENT_ID_PREFIX)
}

export function removeDynamicClientById(id: string): void {
  const existing = getDynamicClients()
  const next = existing.filter((c) => c.id !== id)
  if (next.length === existing.length) return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

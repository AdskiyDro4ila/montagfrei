import { isSupabaseConfigured } from '../../lib/supabase'
import { CLIENT_DATA } from './index'
import { isDynamicClientId } from './dynamicStore'
import {
  deleteStoredClient,
  getStoredClients,
  isStoredClientsLoading,
  refreshStoredClients,
  saveStoredClient,
} from './remoteStore'
import type { ClientData } from './types'

function slugTaken(slug: string): boolean {
  return (
    CLIENT_DATA.some((c) => c.slug === slug || c.code === slug) ||
    getStoredClients().some((c) => c.slug === slug || c.code === slug)
  )
}

export type ClientStorageMode = 'supabase' | 'local'

/** Kunden-Persistenz: Supabase wenn konfiguriert, sonst localStorage. */
export function getClientStorageMode(): ClientStorageMode {
  return isSupabaseConfigured() ? 'supabase' : 'local'
}

export function getDynamicClientsFromStore(): ClientData[] {
  return getStoredClients()
}

export { isStoredClientsLoading, refreshStoredClients }

export function isDeletableClient(id: string): boolean {
  return isDynamicClientId(id)
}

export async function saveClient(client: ClientData): Promise<void> {
  if (slugTaken(client.slug) || slugTaken(client.code)) {
    throw new Error('Kunde mit diesem Slug existiert bereits.')
  }
  await saveStoredClient(client)
}

export async function deleteClient(id: string): Promise<void> {
  if (!isDeletableClient(id)) {
    throw new Error('Fester Demo-Kunde kann nicht gelöscht werden.')
  }
  await deleteStoredClient(id)
}

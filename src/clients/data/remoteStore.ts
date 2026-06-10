import { getSupabase, isSupabaseConfigured } from '../../lib/supabase'
import type { ClientData } from './types'
import {
  addDynamicClient,
  getDynamicClients,
  removeDynamicClientById,
} from './dynamicStore'

interface ClientRow {
  id: string
  slug: string
  code: string
  payload: ClientData
}

let cache: ClientData[] = []
let loading = false
let loadPromise: Promise<void> | null = null

export function getStoredClients(): ClientData[] {
  if (!isSupabaseConfigured() && cache.length === 0) {
    cache = getDynamicClients()
  }
  return cache
}

export function isStoredClientsLoading(): boolean {
  return loading
}

export async function refreshStoredClients(): Promise<void> {
  if (loadPromise) return loadPromise
  loadPromise = doRefresh().finally(() => {
    loadPromise = null
  })
  return loadPromise
}

async function doRefresh(): Promise<void> {
  if (!isSupabaseConfigured()) {
    cache = getDynamicClients()
    return
  }

  loading = true
  try {
    await migrateLocalClientsToSupabase()
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('clients')
      .select('payload')
      .order('created_at', { ascending: true })

    if (error) throw error
    cache = (data ?? []).map((row) => row.payload as ClientData)
  } finally {
    loading = false
  }
}

async function migrateLocalClientsToSupabase(): Promise<void> {
  const local = getDynamicClients()
  if (local.length === 0) return

  const supabase = getSupabase()
  const rows = local.map((client) => toRow(client))
  const { error } = await supabase.from('clients').upsert(rows)
  if (error) throw error

  localStorage.removeItem('montagfrei_dynamic_clients')
}

function toRow(client: ClientData): ClientRow {
  return {
    id: client.id,
    slug: client.slug,
    code: client.code,
    payload: client,
  }
}

export async function saveStoredClient(client: ClientData): Promise<void> {
  if (!isSupabaseConfigured()) {
    addDynamicClient(client)
    cache = getDynamicClients()
    return
  }

  const supabase = getSupabase()
  const { error } = await supabase.from('clients').upsert(toRow(client))
  if (error) throw error

  cache = [...cache.filter((c) => c.id !== client.id), client]
}

export async function deleteStoredClient(id: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    removeDynamicClientById(id)
    cache = getDynamicClients()
    return
  }

  const supabase = getSupabase()
  const { error } = await supabase.from('clients').delete().eq('id', id)
  if (error) throw error

  cache = cache.filter((c) => c.id !== id)
}

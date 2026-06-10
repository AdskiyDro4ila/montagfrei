import { useEffect, useState } from 'react'
import { CLIENTS_UPDATED_EVENT } from '../clients/events'
import {
  isStoredClientsLoading,
  refreshStoredClients,
} from '../clients/data/repository'
import { isSupabaseConfigured } from '../lib/supabase'

/** Re-render wenn Kundenliste sich ändert (Scraper, Löschen, Supabase-Sync). */
export function useClientsVersion(): { version: number; loading: boolean } {
  const [version, setVersion] = useState(0)
  const [loading, setLoading] = useState(isSupabaseConfigured())

  useEffect(() => {
    let cancelled = false

    async function sync(showLoading = isSupabaseConfigured()) {
      if (showLoading) setLoading(true)
      try {
        await refreshStoredClients()
      } finally {
        if (!cancelled) {
          setLoading(false)
          setVersion((v) => v + 1)
        }
      }
    }

    void sync()

    const handler = () => {
      void sync(isSupabaseConfigured())
    }

    window.addEventListener(CLIENTS_UPDATED_EVENT, handler)
    return () => {
      cancelled = true
      window.removeEventListener(CLIENTS_UPDATED_EVENT, handler)
    }
  }, [])

  return { version, loading: loading || isStoredClientsLoading() }
}

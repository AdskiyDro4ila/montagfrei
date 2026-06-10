import { useEffect } from 'react'
import { refreshStoredClients } from '../clients/data/repository'

/** Lädt dynamische Kunden beim App-Start (Demo-Zugang ohne Admin). */
export function ClientsBootstrap() {
  useEffect(() => {
    void refreshStoredClients()
  }, [])

  return null
}

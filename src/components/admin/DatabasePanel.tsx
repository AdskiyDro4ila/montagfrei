import { useState } from 'react'
import { getClientRecords } from '../../clients/admin'
import { deleteClient } from '../../clients/data/repository'
import { notifyClientsUpdated } from '../../clients/events'
import { useClientsVersion } from '../../hooks/useClientsVersion'
import { AdminMessage } from './AdminMessage'
import { AdminRow } from './AdminRow'
import { AdminSection } from './AdminSection'
import { AdminStat } from './AdminStat'
import { AdminStatus } from './AdminStatus'

interface DatabasePanelProps {
  onGoToScraper?: () => void
}

export function DatabasePanel({ onGoToScraper }: DatabasePanelProps) {
  const { loading } = useClientsVersion()
  const [message, setMessage] = useState<{ text: string; tone: 'success' | 'error' } | null>(null)
  const clients = getClientRecords()
  const ownClients = clients.filter((c) => c.deletable)
  const demoClients = clients.filter((c) => !c.deletable)
  const active = clients.filter((c) => c.status === 'active').length
  const pending = clients.filter((c) => c.status === 'pending').length

  async function handleDelete(clientId: string, clientName: string) {
    try {
      await deleteClient(clientId)
      notifyClientsUpdated()
      setMessage({ text: `„${clientName}" wurde gelöscht.`, tone: 'success' })
    } catch (err) {
      setMessage({
        text: err instanceof Error ? err.message : 'Löschen fehlgeschlagen.',
        tone: 'error',
      })
    }
  }

  return (
    <AdminSection
      title="Kunden"
      description="Alle Kunden mit Zugangscode. Klick auf einen Namen öffnet die Demo. Eigene Kunden (aus dem Scraper) können gelöscht werden."
    >
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <AdminStat label="Gesamt" value={clients.length} />
        <AdminStat label="Aktiv" value={active} />
        <AdminStat label="Ausstehend" value={pending} />
      </div>

      {message && <div className="mb-4"><AdminMessage text={message.text} tone={message.tone} /></div>}

      {loading && (
        <p className="mb-4 font-display text-[10px] uppercase tracking-[0.15em] text-black/40">
          Lade Kunden…
        </p>
      )}

      {ownClients.length > 0 && (
        <div className="mb-8">
          <p className="mb-3 font-display text-[10px] font-bold uppercase tracking-[0.15em] text-black">
            Eigene Kunden · {ownClients.length}
          </p>
          <div className="rounded-[4px] border-[3px] border-black px-5">
            {ownClients.map((client) => (
              <AdminRow
                key={client.id}
                primary={client.name}
                secondary={`${client.branch} · ${client.city}`}
                meta={`Code: ${client.code} · Demo: /demo/${client.code}`}
                demoSlug={client.code}
                trailing={<AdminStatus status={client.status} />}
                onDelete={() => handleDelete(client.id, client.name)}
              />
            ))}
          </div>
        </div>
      )}

      {ownClients.length === 0 && !loading && (
        <div className="mb-8 rounded-[4px] border-[3px] border-dashed border-black/20 px-5 py-8 text-center">
          <p className="font-display text-[10px] uppercase tracking-[0.15em] text-black/40">
            Noch keine eigenen Kunden
          </p>
          {onGoToScraper && (
            <button
              type="button"
              onClick={onGoToScraper}
              className="mt-4 rounded-[4px] border-[3px] border-black px-4 py-2 font-display text-[10px] font-bold uppercase tracking-[0.15em] text-black transition-colors hover:bg-black hover:text-white"
            >
              Zum Scraper
            </button>
          )}
        </div>
      )}

      <div>
        <p className="mb-3 font-display text-[10px] font-bold uppercase tracking-[0.15em] text-black/40">
          Demo-Kunden · {demoClients.length}
        </p>
        <div className="rounded-[4px] border-[3px] border-black px-5">
          {demoClients.map((client) => (
            <AdminRow
              key={client.id}
              primary={client.name}
              secondary={`${client.branch} · ${client.city}`}
              meta={`Code: ${client.code}`}
              demoSlug={client.code}
              trailing={<AdminStatus status={client.status} />}
            />
          ))}
        </div>
      </div>
    </AdminSection>
  )
}

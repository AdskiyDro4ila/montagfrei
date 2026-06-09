import { AGENTS } from '../../data/admin-mock'
import { AdminRow } from './AdminRow'
import { AdminSection } from './AdminSection'
import { AdminStat } from './AdminStat'
import { AdminStatus } from './AdminStatus'

export function AgentsPanel() {
  const online = AGENTS.filter((a) => a.status === 'online').length
  const totalConversations = AGENTS.reduce((sum, a) => sum + a.conversations, 0)

  return (
    <AdminSection
      title="Agenten"
      description="KI-Agenten pro Kunde — eingebettet auf der Live-Website. Beantworten Anfragen, koordinieren Termine und entlasten den Betrieb."
    >
      <div className="mb-8 grid grid-cols-2 gap-3">
        <AdminStat label="Online" value={online} />
        <AdminStat label="Gespräche" value={totalConversations} />
      </div>

      <div className="rounded-[4px] border-[3px] border-black px-5">
        {AGENTS.map((agent) => (
          <AdminRow
            key={agent.id}
            primary={agent.clientName}
            secondary={`${agent.branch} · ${agent.model}`}
            meta={`${agent.conversations} Gespräche · ${agent.lastActive}`}
            trailing={<AdminStatus status={agent.status} />}
          />
        ))}
      </div>

      <div className="mt-6 space-y-2 font-display text-[10px] uppercase tracking-[0.1em] text-black/25">
        <p>Module: Anfragen, Termine, Angebote, Notfall, FAQ</p>
        <p>Wissensbasis: Scraper-Daten + manuelle Ergänzungen</p>
      </div>
    </AdminSection>
  )
}

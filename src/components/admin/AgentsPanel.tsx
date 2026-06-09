import { getAgentRecords, getClientSlugByName } from '../../clients/admin'
import { AdminRow } from './AdminRow'
import { AdminSection } from './AdminSection'
import { AdminStat } from './AdminStat'
import { AdminStatus } from './AdminStatus'

export function AgentsPanel() {
  const agents = getAgentRecords()
  const online = agents.filter((a) => a.status === 'online').length
  const totalConversations = agents.reduce((sum, a) => sum + a.conversations, 0)

  return (
    <AdminSection
      title="Agenten"
      description="KI-Agenten pro Kunde — eingebettet auf der Live-Website."
    >
      <div className="mb-8 grid grid-cols-2 gap-3">
        <AdminStat label="Online" value={online} />
        <AdminStat label="Gespräche" value={totalConversations} />
      </div>

      <div className="rounded-[4px] border-[3px] border-black px-5">
        {agents.map((agent) => (
          <AdminRow
            key={agent.id}
            primary={agent.clientName}
            secondary={`${agent.branch} · ${agent.model}`}
            meta={`${agent.conversations} Gespräche · ${agent.lastActive}`}
            demoSlug={getClientSlugByName(agent.clientName)}
            trailing={<AdminStatus status={agent.status} />}
          />
        ))}
      </div>
    </AdminSection>
  )
}

import { CLIENTS } from '../../data/admin-mock'
import { AdminRow } from './AdminRow'
import { AdminSection } from './AdminSection'
import { AdminStat } from './AdminStat'
import { AdminStatus } from './AdminStatus'

export function DatabasePanel() {
  const active = CLIENTS.filter((c) => c.status === 'active').length
  const pending = CLIENTS.filter((c) => c.status === 'pending').length

  return (
    <AdminSection
      title="Datenbank"
      description="Kundenstammdaten — Klick öffnet die Demo-Website direkt."
    >
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <AdminStat label="Kunden" value={CLIENTS.length} />
        <AdminStat label="Aktiv" value={active} />
        <AdminStat label="Ausstehend" value={pending} />
      </div>

      <div className="rounded-[4px] border-[3px] border-black px-5">
        {CLIENTS.map((client) => (
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
    </AdminSection>
  )
}

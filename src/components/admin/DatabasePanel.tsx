import { getClientRecords } from '../../clients/admin'
import { AdminRow } from './AdminRow'
import { AdminSection } from './AdminSection'
import { AdminStat } from './AdminStat'
import { AdminStatus } from './AdminStatus'

export function DatabasePanel() {
  const clients = getClientRecords()
  const active = clients.filter((c) => c.status === 'active').length
  const pending = clients.filter((c) => c.status === 'pending').length

  return (
    <AdminSection
      title="Datenbank"
      description="Kundenstammdaten für Handwerks- und Dienstleistungsbetriebe."
    >
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <AdminStat label="Kunden" value={clients.length} />
        <AdminStat label="Aktiv" value={active} />
        <AdminStat label="Ausstehend" value={pending} />
      </div>

      <div className="rounded-[4px] border-[3px] border-black px-5">
        {clients.map((client) => (
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

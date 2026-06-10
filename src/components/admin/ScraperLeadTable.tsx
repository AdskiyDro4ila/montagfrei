import type { ScraperLead } from '../../clients/scraper/leadTypes'

interface ScraperLeadTableProps {
  leads: ScraperLead[]
  loading: boolean
  addingId: string | null
  isLeadAdded: (lead: ScraperLead) => boolean
  onAddClient: (lead: ScraperLead) => void
}

export function ScraperLeadTable({
  leads,
  loading,
  addingId,
  isLeadAdded,
  onAddClient,
}: ScraperLeadTableProps) {
  if (loading) {
    return (
      <div className="rounded-[4px] border-[3px] border-black px-5 py-10 text-center font-display text-[10px] uppercase tracking-[0.15em] text-black/40">
        Suche läuft…
      </div>
    )
  }

  if (leads.length === 0) {
    return (
      <div className="rounded-[4px] border-[3px] border-black px-5 py-10 text-center font-display text-[10px] uppercase tracking-[0.15em] text-black/40">
        Keine Ergebnisse. Umkreis, Branchen oder Mittelpunkt anpassen.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-[4px] border-[3px] border-black">
      <table className="w-full min-w-[720px] border-collapse font-display text-left text-xs">
        <thead>
          <tr className="border-b-[3px] border-black bg-black/[0.03]">
            <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.12em]">Firma</th>
            <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.12em]">Branche</th>
            <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.12em]">Adresse</th>
            <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.12em]">Kontakt</th>
            <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.12em]">km</th>
            <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.12em]"></th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => {
            const added = isLeadAdded(lead)
            const isAdding = addingId === lead.id
            return (
              <tr key={lead.id} className="border-b border-black/10 last:border-b-0">
                <td className="px-4 py-3 font-bold uppercase tracking-tight text-black">
                  {lead.name}
                </td>
                <td className="px-4 py-3 text-black/50">{lead.branchLabel}</td>
                <td className="px-4 py-3 text-black/60">
                  {lead.address}
                  <br />
                  {lead.city}
                </td>
                <td className="px-4 py-3 text-black/60">
                  {lead.phone && (
                    <a href={`tel:${lead.phone.replace(/\s/g, '')}`} className="block hover:underline">
                      {lead.phone}
                    </a>
                  )}
                  {lead.email && (
                    <a href={`mailto:${lead.email}`} className="mt-1 block hover:underline">
                      {lead.email}
                    </a>
                  )}
                  {lead.website && (
                    <a
                      href={lead.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-black/40 hover:underline"
                    >
                      Web
                    </a>
                  )}
                  {!lead.phone && !lead.email && !lead.website && (
                    <span className="text-black/30">—</span>
                  )}
                </td>
                <td className="px-4 py-3 tabular-nums text-black/40">{lead.distanceKm}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    disabled={added || isAdding}
                    onClick={() => onAddClient(lead)}
                    className="whitespace-nowrap rounded-[4px] border-[3px] border-black px-2.5 py-1 font-display text-[9px] font-bold uppercase tracking-[0.1em] transition-colors hover:bg-black hover:text-white disabled:border-black/20 disabled:text-black/30 disabled:hover:bg-transparent"
                  >
                    {isAdding ? '…' : added ? 'Angelegt' : 'Als Kunde'}
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

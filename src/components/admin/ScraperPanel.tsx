import { SCRAPER_JOBS } from '../../data/admin-mock'
import { AdminRow } from './AdminRow'
import { AdminSection } from './AdminSection'
import { AdminStatus } from './AdminStatus'

export function ScraperPanel() {
  return (
    <AdminSection
      title="Scraper"
      description="Automatisches Auslesen von Kundendaten aus Websites, Google Business und Branchenbüchern — Grundlage für Demo-Websites und Agenten-Wissen."
    >
      <div className="rounded-[4px] border-[3px] border-black px-5">
        {SCRAPER_JOBS.map((job) => (
          <AdminRow
            key={job.id}
            primary={job.clientName}
            secondary={`${job.source} → ${job.target}`}
            meta={`Letzter Lauf: ${job.lastRun} · ${job.itemsFound} Einträge`}
            trailing={<AdminStatus status={job.status} />}
          />
        ))}
      </div>

      <div className="mt-6 space-y-2 font-display text-[10px] uppercase tracking-[0.1em] text-black/25">
        <p>Quellen: Website, Google Business, Gelbe Seiten, Impressum</p>
        <p>Output: Leistungen, Preise, Öffnungszeiten, Servicegebiet, FAQ</p>
      </div>
    </AdminSection>
  )
}

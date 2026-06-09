import { getClientCodeByName, SCRAPER_JOBS } from '../../data/admin-mock'
import { AdminRow } from './AdminRow'
import { AdminSection } from './AdminSection'
import { AdminStatus } from './AdminStatus'

export function ScraperPanel() {
  return (
    <AdminSection
      title="Scraper"
      description="Automatisches Auslesen von Kundendaten — Klick öffnet die zugehörige Demo."
    >
      <div className="rounded-[4px] border-[3px] border-black px-5">
        {SCRAPER_JOBS.map((job) => (
          <AdminRow
            key={job.id}
            primary={job.clientName}
            secondary={`${job.source} → ${job.target}`}
            meta={`Letzter Lauf: ${job.lastRun} · ${job.itemsFound} Einträge`}
            demoSlug={getClientCodeByName(job.clientName)}
            trailing={<AdminStatus status={job.status} />}
          />
        ))}
      </div>
    </AdminSection>
  )
}

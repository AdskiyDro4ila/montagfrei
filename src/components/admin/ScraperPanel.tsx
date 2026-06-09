import { getClientSlugByName, getScraperJobs } from '../../clients/admin'
import { AdminRow } from './AdminRow'
import { AdminSection } from './AdminSection'
import { AdminStatus } from './AdminStatus'

export function ScraperPanel() {
  const jobs = getScraperJobs()

  return (
    <AdminSection
      title="Scraper"
      description="Automatisches Auslesen von Kundendaten aus Websites, Google Business und Branchenbüchern."
    >
      <div className="rounded-[4px] border-[3px] border-black px-5">
        {jobs.map((job) => (
          <AdminRow
            key={job.id}
            primary={job.clientName}
            secondary={`${job.source} → ${job.target}`}
            meta={`Letzter Lauf: ${job.lastRun} · ${job.itemsFound} Einträge`}
            demoSlug={getClientSlugByName(job.clientName)}
            trailing={<AdminStatus status={job.status} />}
          />
        ))}
      </div>
    </AdminSection>
  )
}

import { useState } from 'react'

import { saveClient } from '../../clients/data/repository'

import { notifyClientsUpdated } from '../../clients/events'

import { areaLabel } from '../../clients/scraper/areaUtils'

import { leadToClientData } from '../../clients/scraper/leadToClient'

import {

  searchLeadsInArea,

  type ScraperSearchSource,

} from '../../clients/scraper/searchLeads'

import {

  SCRAPER_BRANCHES,

  type ScraperBranchId,

  type ScraperLead,

  type SearchArea,

} from '../../clients/scraper/leadTypes'

import { getClientSlugByName, getScraperJobs, isLeadAlreadyClient } from '../../clients/admin'

import { useClientsVersion } from '../../hooks/useClientsVersion'

import { AdminMessage } from './AdminMessage'

import { AdminRow } from './AdminRow'

import { AdminSection } from './AdminSection'

import { AdminStatus } from './AdminStatus'

import { ScraperMap } from './ScraperMap'

import { ScraperLeadTable } from './ScraperLeadTable'



function sourceLabel(source: ScraperSearchSource): string {

  return source === 'geoapify' ? 'Geoapify' : 'Demo-Daten'

}



export function ScraperPanel() {

  const { loading: clientsLoading } = useClientsVersion()

  const jobs = getScraperJobs()



  const [searchArea, setSearchArea] = useState<SearchArea | null>(null)

  const [branches, setBranches] = useState<ScraperBranchId[]>([

    'reinigung',

    'garten',

    'maler',

    'hausmeister',

  ])

  const [leads, setLeads] = useState<ScraperLead[]>([])

  const [searchSource, setSearchSource] = useState<ScraperSearchSource | null>(null)

  const [loading, setLoading] = useState(false)

  const [addingId, setAddingId] = useState<string | null>(null)

  const [searched, setSearched] = useState(false)

  const [message, setMessage] = useState<{

    text: string

    tone: 'info' | 'success' | 'error'

  } | null>(null)



  function toggleBranch(id: ScraperBranchId) {

    setBranches((prev) =>

      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id],

    )

  }



  function selectAllBranches() {

    setBranches(SCRAPER_BRANCHES.map((b) => b.id))

  }



  async function handleSearch() {

    if (!searchArea) return

    setLoading(true)

    setSearched(true)

    setMessage(null)

    setSearchSource(null)

    try {

      const { leads: results, source, apiFailed } = await searchLeadsInArea({

        area: searchArea,

        branches,

      })

      setLeads(results)

      setSearchSource(source)

      if (apiFailed) {

        setMessage({

          text: `${results.length} Demo-Treffer — Geoapify nicht erreichbar. GEOAPIFY_API_KEY in .env.local prüfen.`,

          tone: 'info',

        })

      } else if (results.length === 0) {

        setMessage({

          text: 'Keine Firmen in diesem Gebiet. Größeres Gebiet zeichnen oder mehr Branchen wählen.',

          tone: 'info',

        })

      }

    } catch {

      setMessage({ text: 'Suche fehlgeschlagen. Bitte erneut versuchen.', tone: 'error' })

      setLeads([])

    } finally {

      setLoading(false)

    }

  }



  async function handleAddClient(lead: ScraperLead) {

    setAddingId(lead.id)

    setMessage(null)

    try {

      const client = leadToClientData(lead)

      await saveClient(client)

      notifyClientsUpdated()

      setMessage({

        text: `„${lead.name}" angelegt. Code: ${client.code} — Demo unter /demo/${client.slug}`,

        tone: 'success',

      })

    } catch (err) {

      setMessage({

        text: err instanceof Error ? err.message : 'Kunde konnte nicht angelegt werden.',

        tone: 'error',

      })

    } finally {

      setAddingId(null)

    }

  }



  const canSearch = Boolean(searchArea) && branches.length > 0 && !loading



  return (

    <AdminSection

      title="Firmen suchen"

      description="Kreis oder Freihand auf der Karte zeichnen, Branchen wählen, Firmen laden und als Kunde anlegen."

    >

      <div className="space-y-8">

        <ScraperMap area={searchArea} onAreaChange={setSearchArea} />



        {searchArea && (

          <p className="font-display text-[10px] uppercase tracking-[0.12em] text-black/40">

            Gebiet: {areaLabel(searchArea)}

          </p>

        )}



        <div>

          <div className="flex items-center justify-between gap-2">

            <p className="font-display text-[10px] font-bold uppercase tracking-[0.15em] text-black">

              Branchen

            </p>

            <button

              type="button"

              onClick={selectAllBranches}

              className="font-display text-[9px] font-bold uppercase tracking-[0.1em] text-black/40 transition-colors hover:text-black"

            >

              Alle

            </button>

          </div>

          <div className="mt-3 flex flex-wrap gap-2">

            {SCRAPER_BRANCHES.map(({ id, label }) => {

              const active = branches.includes(id)

              return (

                <button

                  key={id}

                  type="button"

                  onClick={() => toggleBranch(id)}

                  className={`

                    rounded-[4px] border-[3px] border-black px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.08em] transition-colors

                    ${active ? 'bg-black text-white' : 'text-black/50 hover:bg-black/[0.04] hover:text-black'}

                  `}

                >

                  {label}

                </button>

              )

            })}

          </div>

          {branches.length === 0 && (

            <p className="mt-2 font-display text-[10px] uppercase tracking-[0.1em] text-black/40">

              Mindestens eine Branche wählen

            </p>

          )}

        </div>



        <button

          type="button"

          onClick={handleSearch}

          disabled={!canSearch}

          className="w-full rounded-[4px] border-[3px] border-black bg-black py-3 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:px-10"

        >

          {loading ? 'Suche läuft…' : 'Firmen suchen'}

        </button>



        {!searchArea && (

          <p className="font-display text-[10px] uppercase tracking-[0.1em] text-black/30">

            Zuerst ein Gebiet auf der Karte zeichnen

          </p>

        )}



        {message && <AdminMessage text={message.text} tone={message.tone} />}



        {searched && (

          <>

            {searchSource && leads.length > 0 && (

              <p className="font-display text-[10px] uppercase tracking-[0.12em] text-black/40">

                {leads.length} Treffer · {sourceLabel(searchSource)}

              </p>

            )}

            <ScraperLeadTable

              leads={leads}

              loading={loading || clientsLoading}

              addingId={addingId}

              isLeadAdded={isLeadAlreadyClient}

              onAddClient={handleAddClient}

            />

          </>

        )}



        {jobs.length > 0 && (

          <div>

            <p className="mb-4 font-display text-[10px] font-bold uppercase tracking-[0.15em] text-black/40">

              Scraper-Historie

            </p>

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

          </div>

        )}

      </div>

    </AdminSection>

  )

}



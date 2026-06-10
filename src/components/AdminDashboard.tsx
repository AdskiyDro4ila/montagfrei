import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getClientStorageMode } from '../clients/data/repository'
import { clearSession } from '../lib/auth'
import { AgentsPanel, DatabasePanel, ScraperPanel } from './admin'
import { AdminTabs, type AdminTabId } from './admin/AdminTabs'

export function AdminDashboard() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<AdminTabId>('scraper')
  const storage = getClientStorageMode()

  function handleLogout() {
    clearSession()
    navigate('/')
  }

  return (
    <div className="min-h-dvh w-full bg-white px-5 pb-16 pt-12 sm:px-8 sm:pt-16">
      <div className="view-enter mx-auto w-full max-w-4xl">
        <header className="mb-10 flex items-start justify-between gap-6">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-black">
              Admin
            </p>
            <p className="mt-3 font-display text-[10px] uppercase tracking-[0.15em] text-black/30">
              Montagfrei · Intern · {storage === 'supabase' ? 'Supabase' : 'Lokal'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="shrink-0 rounded-[4px] border-[3px] border-black px-4 py-2 font-display text-[10px] font-bold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-black hover:text-white"
          >
            Logout
          </button>
        </header>

        <p className="mb-8 font-display text-xs leading-relaxed text-black/50">
          Ablauf: Firmen im Umkreis suchen → als Kunde anlegen → in der Datenbank verwalten.
          Feste Demo-Kunden bleiben im System, neue Kunden kannst du jederzeit löschen.
        </p>

        <AdminTabs active={tab} onChange={setTab} />

        <div>
          {tab === 'scraper' && <ScraperPanel />}
          {tab === 'database' && <DatabasePanel onGoToScraper={() => setTab('scraper')} />}
          {tab === 'agents' && <AgentsPanel />}
        </div>
      </div>
    </div>
  )
}

import { useNavigate } from 'react-router-dom'
import { clearSession } from '../lib/auth'
import { AgentsPanel, DatabasePanel, ScraperPanel } from './admin'

export function AdminDashboard() {
  const navigate = useNavigate()

  function handleLogout() {
    clearSession()
    navigate('/')
  }

  return (
    <div className="min-h-dvh w-full bg-white px-5 pb-16 pt-12 sm:px-8 sm:pt-16">
      <div className="view-enter mx-auto w-full max-w-2xl">
        <header className="mb-16 flex items-start justify-between gap-6">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-black">
              Admin
            </p>
            <p className="mt-3 font-display text-[10px] uppercase tracking-[0.15em] text-black/30">
              Montagfrei · Intern
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

        <div className="space-y-16">
          <DatabasePanel />
          <ScraperPanel />
          <AgentsPanel />
        </div>
      </div>
    </div>
  )
}

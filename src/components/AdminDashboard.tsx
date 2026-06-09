import { clearSession } from '../lib/auth'
import { DesignSection } from './DesignSection'

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  function handleLogout() {
    clearSession()
    onLogout()
  }

  return (
    <DesignSection id="admin" className="bg-white">
      <div className="view-enter w-full max-w-md text-center">
        <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-black">
          Admin
        </p>

        <p className="mt-16 font-display text-sm uppercase tracking-[0.1em] text-black/50">
          Dashboard folgt
        </p>

        <p className="mt-8 px-4 font-display text-xs leading-relaxed text-black/30">
          Hier werden später Kunden, Zugangscodes und implementierte Websites verwaltet.
        </p>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-20 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-black/20 transition-opacity duration-300 hover:text-black/50"
        >
          Logout
        </button>
      </div>
    </DesignSection>
  )
}

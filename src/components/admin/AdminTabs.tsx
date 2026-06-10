export type AdminTabId = 'scraper' | 'database' | 'agents'

interface AdminTab {
  id: AdminTabId
  step: string
  label: string
  hint: string
}

const TABS: AdminTab[] = [
  { id: 'scraper', step: '1', label: 'Firmen suchen', hint: 'Karte · Umkreis · OSM' },
  { id: 'database', step: '2', label: 'Kunden', hint: 'Anlegen · Löschen · Demo' },
  { id: 'agents', step: '3', label: 'Agenten', hint: 'KI-Status pro Kunde' },
]

interface AdminTabsProps {
  active: AdminTabId
  onChange: (tab: AdminTabId) => void
}

export function AdminTabs({ active, onChange }: AdminTabsProps) {
  return (
    <nav
      className="mb-12 grid gap-2 sm:grid-cols-3"
      aria-label="Admin-Bereiche"
    >
      {TABS.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`
              rounded-[4px] border-[3px] border-black px-4 py-4 text-left transition-colors
              ${isActive ? 'bg-black text-white' : 'text-black hover:bg-black/[0.04]'}
            `}
          >
            <span
              className={`font-display text-[10px] font-bold uppercase tracking-[0.2em] ${isActive ? 'text-white/50' : 'text-black/30'}`}
            >
              Schritt {tab.step}
            </span>
            <span className="mt-2 block font-display text-sm font-bold uppercase tracking-tight">
              {tab.label}
            </span>
            <span
              className={`mt-1 block font-display text-[10px] uppercase tracking-[0.1em] ${isActive ? 'text-white/40' : 'text-black/40'}`}
            >
              {tab.hint}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

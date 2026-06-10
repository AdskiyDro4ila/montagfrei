export type AdminTabId = 'scraper' | 'database' | 'agents'

const TABS: { id: AdminTabId; label: string }[] = [
  { id: 'scraper', label: 'Scraper' },
  { id: 'database', label: 'Kunden' },
  { id: 'agents', label: 'Agenten' },
]

interface AdminTabsProps {
  active: AdminTabId
  onChange: (tab: AdminTabId) => void
}

export function AdminTabs({ active, onChange }: AdminTabsProps) {
  return (
    <nav
      className="mb-10 flex flex-wrap gap-2 border-b-[3px] border-black pb-0"
      aria-label="Admin-Bereiche"
    >
      {TABS.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            aria-current={isActive ? 'page' : undefined}
            className={`
              -mb-[3px] rounded-t-[4px] border-[3px] border-b-0 border-black px-5 py-2.5 font-display text-[10px] font-bold uppercase tracking-[0.15em] transition-colors
              ${isActive ? 'bg-black text-white' : 'border-b-[3px] text-black/50 hover:bg-black/[0.04] hover:text-black'}
            `}
          >
            {tab.label}
          </button>
        )
      })}
    </nav>
  )
}

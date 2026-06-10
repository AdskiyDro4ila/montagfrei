import { Link } from 'react-router-dom'

interface HomeFooterProps {
  visible: boolean
}

const row1 = [
  { to: '/faq', label: 'FAQ' },
  { to: '/impressum', label: 'Impressum' },
  { to: '/agb', label: 'AGB' },
] as const

const row2 = [
  { to: '/datenschutz', label: 'Datenschutz' },
  { to: '/ueber-uns', label: 'Über uns' },
  { to: '/kontakt', label: 'Kontakt' },
] as const

function FooterRow({
  links,
  visible,
}: {
  links: readonly { to: string; label: string }[]
  visible: boolean
}) {
  return (
    <div className="flex items-center justify-center gap-6 sm:gap-10">
      {links.map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          tabIndex={visible ? 0 : -1}
          className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-black/30 transition-colors duration-300 hover:text-black sm:tracking-[0.2em]"
        >
          {label}
        </Link>
      ))}
    </div>
  )
}

export function HomeFooter({ visible }: HomeFooterProps) {
  return (
    <nav
      className={`
        fixed bottom-0 left-0 right-0 z-20
        flex flex-col items-center gap-3
        px-5 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-2
        transition-all duration-700 ease-out
        ${visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-10 opacity-0'
        }
      `}
      aria-hidden={!visible}
    >
      <FooterRow links={row1} visible={visible} />
      <FooterRow links={row2} visible={visible} />
    </nav>
  )
}

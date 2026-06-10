import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface LegalLayoutProps {
  title: string
  children: ReactNode
  headerAction?: ReactNode
}

export function LegalLayout({ title, children, headerAction }: LegalLayoutProps) {
  return (
    <div className="min-h-dvh bg-white">
      <header className="border-b-[3px] border-black px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-start justify-between gap-4">
            <Link
              to="/"
              className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 transition-opacity hover:text-black/60"
            >
              ← Montagfrei
            </Link>
            {headerAction}
          </div>
          <h1 className="mt-10 font-display text-xs font-bold uppercase tracking-[0.2em] text-black">
            {title}
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="space-y-8 font-display text-sm leading-relaxed text-black/70">
          {children}
        </div>
      </main>
    </div>
  )
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-black">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

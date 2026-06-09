import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { demoRoute } from '../../lib/routes'

interface AdminRowProps {
  primary: string
  secondary?: string
  meta?: string
  trailing?: ReactNode
  demoSlug?: string
}

export function AdminRow({ primary, secondary, meta, trailing, demoSlug }: AdminRowProps) {
  const inner = (
    <>
      <div className="min-w-0 flex-1">
        <p className="font-display text-sm font-bold uppercase tracking-tight text-black">
          {primary}
        </p>
        {secondary && (
          <p className="mt-1 font-display text-xs text-black/50">{secondary}</p>
        )}
        {meta && (
          <p className="mt-2 font-display text-[10px] uppercase tracking-[0.1em] text-black/30">
            {meta}
          </p>
        )}
        {demoSlug && (
          <p className="mt-2 font-display text-[10px] font-bold uppercase tracking-[0.15em] text-black/40 transition-colors group-hover:text-black">
            Demo öffnen →
          </p>
        )}
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </>
  )

  if (demoSlug) {
    return (
      <Link
        to={demoRoute(demoSlug)}
        className="group flex items-start justify-between gap-4 border-b border-black/10 py-5 transition-colors last:border-b-0 hover:bg-black/[0.02]"
      >
        {inner}
      </Link>
    )
  }

  return (
    <div className="flex items-start justify-between gap-4 border-b border-black/10 py-5 last:border-b-0">
      {inner}
    </div>
  )
}

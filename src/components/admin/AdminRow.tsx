import type { ReactNode } from 'react'

interface AdminRowProps {
  primary: string
  secondary?: string
  meta?: string
  trailing?: ReactNode
}

export function AdminRow({ primary, secondary, meta, trailing }: AdminRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-black/10 py-5 last:border-b-0">
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
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </div>
  )
}

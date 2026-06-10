import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { demoRoute } from '../../lib/routes'

interface AdminRowProps {
  primary: string
  secondary?: string
  meta?: string
  trailing?: ReactNode
  demoSlug?: string
  onDelete?: () => void | Promise<void>
  deleteLabel?: string
}

function RowContent({ primary, secondary, meta }: Pick<AdminRowProps, 'primary' | 'secondary' | 'meta'>) {
  return (
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
  )
}

export function AdminRow({
  primary,
  secondary,
  meta,
  trailing,
  demoSlug,
  onDelete,
  deleteLabel = 'Löschen',
}: AdminRowProps) {
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleConfirmDelete() {
    if (!onDelete) return
    setDeleting(true)
    try {
      await onDelete()
    } finally {
      setDeleting(false)
      setConfirming(false)
    }
  }

  const deleteControl = onDelete && (
    <div className="flex items-center gap-1.5">
      {confirming ? (
        <>
          <button
            type="button"
            disabled={deleting}
            onClick={handleConfirmDelete}
            className="rounded-[4px] border-[3px] border-black bg-black px-2.5 py-1 font-display text-[9px] font-bold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-80 disabled:opacity-40"
          >
            {deleting ? '…' : 'Ja'}
          </button>
          <button
            type="button"
            disabled={deleting}
            onClick={() => setConfirming(false)}
            className="rounded-[4px] border-[3px] border-black px-2.5 py-1 font-display text-[9px] font-bold uppercase tracking-[0.1em] text-black/50 transition-colors hover:bg-black/[0.04]"
          >
            Nein
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="rounded-[4px] border-[3px] border-black px-2.5 py-1 font-display text-[9px] font-bold uppercase tracking-[0.1em] text-black/50 transition-colors hover:bg-black hover:text-white"
        >
          {deleteLabel}
        </button>
      )}
    </div>
  )

  const actions = (trailing || deleteControl) && (
    <div className="flex shrink-0 items-center gap-2">
      {trailing}
      {deleteControl}
    </div>
  )

  return (
    <div className="flex items-start justify-between gap-4 border-b border-black/10 py-5 last:border-b-0">
      {demoSlug ? (
        <Link
          to={demoRoute(demoSlug)}
          className="min-w-0 flex-1 transition-colors hover:opacity-70"
          title="Demo öffnen"
        >
          <RowContent primary={primary} secondary={secondary} meta={meta} />
        </Link>
      ) : (
        <RowContent primary={primary} secondary={secondary} meta={meta} />
      )}
      {actions}
    </div>
  )
}

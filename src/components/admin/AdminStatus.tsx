const STATUS_LABELS: Record<string, string> = {
  active: 'Aktiv',
  inactive: 'Inaktiv',
  pending: 'Ausstehend',
  idle: 'Bereit',
  running: 'Läuft',
  done: 'Fertig',
  error: 'Fehler',
  online: 'Online',
  offline: 'Offline',
  training: 'Training',
}

interface AdminStatusProps {
  status: string
}

export function AdminStatus({ status }: AdminStatusProps) {
  return (
    <span className="inline-block rounded-[4px] border-[3px] border-black px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.1em] text-black">
      {STATUS_LABELS[status] ?? status}
    </span>
  )
}

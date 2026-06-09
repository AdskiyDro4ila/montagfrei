interface AdminStatProps {
  label: string
  value: string | number
}

export function AdminStat({ label, value }: AdminStatProps) {
  return (
    <div className="rounded-[4px] border-[3px] border-black px-5 py-4">
      <p className="font-display text-[10px] font-bold uppercase tracking-[0.15em] text-black/40">
        {label}
      </p>
      <p className="mt-2 font-display text-2xl font-bold tracking-tight text-black">
        {value}
      </p>
    </div>
  )
}

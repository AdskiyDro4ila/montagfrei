import type { ReactNode } from 'react'

interface AdminSectionProps {
  title: string
  description: string
  children: ReactNode
}

export function AdminSection({ title, description, children }: AdminSectionProps) {
  return (
    <section className="border-t-[3px] border-black pt-10 first:border-t-0 first:pt-0">
      <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-black">
        {title}
      </h2>
      <p className="mt-3 font-display text-xs leading-relaxed text-black/40">
        {description}
      </p>
      <div className="mt-8">{children}</div>
    </section>
  )
}

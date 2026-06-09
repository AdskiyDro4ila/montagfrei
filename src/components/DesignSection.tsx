import type { ReactNode } from 'react'

interface DesignSectionProps {
  id: string
  children: ReactNode
  className?: string
}

export function DesignSection({
  id,
  children,
  className = '',
}: DesignSectionProps) {
  return (
    <section
      id={id}
      className={`relative flex min-h-dvh w-full items-center justify-center overflow-hidden px-5 sm:px-8 ${className}`}
      aria-label="Montagfrei"
    >
      {children}
    </section>
  )
}

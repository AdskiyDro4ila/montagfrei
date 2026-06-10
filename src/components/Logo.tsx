import type { CSSProperties, ReactNode } from 'react'

interface LogoProps {
  onClick?: () => void
  className?: string
  style?: CSSProperties
  children?: ReactNode
  variant?: 'default' | 'light' | 'editorial' | 'mono'
}

const hoverStyles: Record<NonNullable<LogoProps['variant']>, string> = {
  default:
    'transition-all duration-500 ease-out hover:tracking-[0.08em] hover:opacity-80 active:scale-[0.98]',
  light:
    'transition-all duration-500 ease-out hover:tracking-[0.06em] hover:text-white/90 active:scale-[0.98]',
  editorial:
    'transition-all duration-700 ease-out hover:italic hover:opacity-75 active:scale-[0.99]',
  mono:
    'transition-all duration-300 ease-out hover:opacity-60 active:scale-[0.97]',
}

export function Logo({
  onClick,
  className = '',
  style,
  children,
  variant = 'default',
}: LogoProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        min-h-11 cursor-pointer border-none bg-transparent p-2
        focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2
        ${hoverStyles[variant]}
        ${className}
      `}
      style={style}
      aria-label="Montagfrei Zugang"
    >
      {children ?? 'Montagfrei'}
    </button>
  )
}

import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface AccessButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isLoading?: boolean
}

export function AccessButton({
  children,
  isLoading,
  disabled,
  className = '',
  ...props
}: AccessButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      className={`
        h-[60px] w-full rounded-[4px] border-[3px] border-black bg-white
        font-display text-sm font-bold uppercase tracking-[0.15em] text-black
        transition-all duration-300 ease-out
        hover:bg-black hover:text-white
        active:scale-[0.99]
        disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black
        ${isLoading ? 'opacity-60' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? '···' : children}
    </button>
  )
}

import type { InputHTMLAttributes } from 'react'

interface AccessFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
  variant?: 'code' | 'password'
}

export function AccessField({
  hasError,
  variant = 'code',
  className = '',
  ...props
}: AccessFieldProps) {
  const isPassword = variant === 'password'

  return (
    <input
      {...props}
      className={`
        h-[60px] w-full rounded-[4px] border-[3px] border-black bg-white px-6
        text-center font-display text-black
        transition-all duration-300 ease-out
        focus:border-[4px] focus:outline-none
        disabled:opacity-40
        ${isPassword
          ? 'text-base font-normal tracking-normal'
          : 'text-xl font-bold uppercase tracking-tight placeholder:font-normal placeholder:normal-case placeholder:tracking-normal placeholder:text-black/25'
        }
        ${hasError ? 'animate-[shake_0.4s_ease-in-out]' : ''}
        ${className}
      `}
    />
  )
}

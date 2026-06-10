interface AdminMessageProps {
  text: string
  tone?: 'info' | 'success' | 'error'
}

const TONE_CLASS = {
  info: 'border-black/20 text-black/60',
  success: 'border-black/30 text-black/70',
  error: 'border-black text-black',
} as const

export function AdminMessage({ text, tone = 'info' }: AdminMessageProps) {
  return (
    <p
      className={`rounded-[4px] border-[3px] px-4 py-3 font-display text-xs leading-relaxed ${TONE_CLASS[tone]}`}
      role="status"
    >
      {text}
    </p>
  )
}

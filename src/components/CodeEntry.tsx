import { FormEvent, useState } from 'react'
import { isAdminAccessCode, validateAccessCode, validateAdminAccess } from '../lib/auth'
import { DesignSection } from './DesignSection'
import { AccessField } from './ui/AccessField'
import { AccessButton } from './ui/AccessButton'

interface CodeEntryProps {
  onBack: () => void
  onAdminSuccess: () => void
}

export function CodeEntry({ onBack, onAdminSuccess }: CodeEntryProps) {
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const showPassword = isAdminAccessCode(code)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (isLoading) return

    setError(null)
    setIsLoading(true)

    const result = showPassword
      ? await validateAdminAccess(code, password)
      : await validateAccessCode(code)

    setIsLoading(false)

    if (result.success) {
      if (result.role === 'admin') {
        onAdminSuccess()
        return
      }
      setIsSuccess(true)
      return
    }

    setError(result.error ?? 'Invalid access code.')
  }

  const canSubmit = showPassword
    ? code.trim() && password.trim()
    : code.trim()

  return (
    <DesignSection id="access" className="bg-white">
      <div className="view-enter w-full max-w-md">
        {isSuccess ? (
          <div className="animate-fade-up text-center">
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-black">
              Access
            </p>
            <p className="mt-16 font-display text-sm uppercase tracking-[0.1em] text-black/50">
              Granted
            </p>
          </div>
        ) : (
          <>
            <h1 className="mb-16 text-center font-display text-xs font-bold uppercase tracking-[0.2em] text-black">
              Access
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <AccessField
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value)
                    if (error) setError(null)
                    if (!isAdminAccessCode(e.target.value)) setPassword('')
                  }}
                  placeholder="Code"
                  autoComplete="off"
                  autoFocus
                  disabled={isLoading}
                  hasError={!!error}
                  aria-invalid={!!error}
                  aria-describedby={error ? 'access-error' : undefined}
                />

                <div
                  className={`
                    grid transition-all duration-300 ease-out
                    ${showPassword ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
                  `}
                >
                  <div className="overflow-hidden">
                    <AccessField
                      type="password"
                      variant="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        if (error) setError(null)
                      }}
                      placeholder="Password"
                      autoComplete="current-password"
                      disabled={isLoading}
                      hasError={!!error}
                      aria-hidden={!showPassword}
                      tabIndex={showPassword ? 0 : -1}
                    />
                  </div>
                </div>

                {error && (
                  <p
                    id="access-error"
                    className="animate-fade-up text-center font-display text-xs uppercase tracking-[0.1em] text-black/40"
                  >
                    {error}
                  </p>
                )}
              </div>

              <AccessButton disabled={!canSubmit} isLoading={isLoading}>
                Continue
              </AccessButton>
            </form>
          </>
        )}

        <button
          type="button"
          onClick={onBack}
          className="mt-20 w-full font-display text-[10px] font-bold uppercase tracking-[0.2em] text-black/20 transition-opacity duration-300 hover:text-black/50"
        >
          Back
        </button>
      </div>
    </DesignSection>
  )
}

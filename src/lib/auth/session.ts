import type { AuthSession } from './types'

const SESSION_KEY = 'montagfrei_session'

export function saveSession(session: AuthSession): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function getSession(): AuthSession | null {
  const raw = sessionStorage.getItem(SESSION_KEY)
  if (!raw) return null

  try {
    const session = JSON.parse(raw) as AuthSession
    if (session.expiresAt < Date.now()) {
      clearSession()
      return null
    }
    return session
  } catch {
    return null
  }
}

export function clearSession(): void {
  sessionStorage.removeItem(SESSION_KEY)
}

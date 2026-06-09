import { getDemoSlugByCode } from '../../demos/registry'
import { getAdminPassword, isAdminAccessCode } from './config'
import { saveSession } from './session'
import type { AuthResult, UserRole } from './types'

function createSessionToken(role: UserRole, demoSlug?: string): string {
  return btoa(`mf_${role}_${demoSlug ?? 'none'}_${Date.now()}`)
}

async function simulateLatency(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 600))
}

/** Standard client access — no password required */
export async function validateAccessCode(code: string): Promise<AuthResult> {
  const normalized = code.trim().toLowerCase()

  if (!normalized) {
    return { success: false, error: 'Enter an access code.' }
  }

  if (isAdminAccessCode(normalized)) {
    return { success: false, error: 'Enter your password.' }
  }

  await simulateLatency()

  const demoSlug = getDemoSlugByCode(normalized)

  if (!demoSlug) {
    return { success: false, error: 'Invalid access code.' }
  }

  saveSession({
    token: createSessionToken('client', demoSlug),
    expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    role: 'client',
    demoSlug,
  })

  return { success: true, role: 'client', demoSlug }
}

/** Admin access — only when code is "admin" and password matches */
export async function validateAdminAccess(
  code: string,
  password: string,
): Promise<AuthResult> {
  const normalizedCode = code.trim().toLowerCase()

  if (!isAdminAccessCode(normalizedCode)) {
    return { success: false, error: 'Invalid access code.' }
  }

  if (!password.trim()) {
    return { success: false, error: 'Enter your password.' }
  }

  await simulateLatency()

  if (password !== getAdminPassword()) {
    return { success: false, error: 'Invalid password.' }
  }

  saveSession({
    token: createSessionToken('admin'),
    expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    role: 'admin',
  })

  return { success: true, role: 'admin' }
}

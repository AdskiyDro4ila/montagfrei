import { getAdminPassword, isAdminAccessCode } from './config'
import { saveSession } from './session'
import type { AuthResult, InviteCode, UserRole } from './types'

/**
 * Client invite codes for demo websites (Putzfirmen, Gartenbauer, etc.).
 * Replace with API lookup when backend is connected.
 */
const INVITE_CODES: InviteCode[] = [
  { code: 'montagfrei', role: 'client' },
]

function findInvite(code: string): InviteCode | undefined {
  return INVITE_CODES.find((invite) => invite.code === code)
}

function createSessionToken(role: UserRole): string {
  return btoa(`mf_${role}_${Date.now()}`)
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

  const invite = findInvite(normalized)

  if (!invite) {
    return { success: false, error: 'Invalid access code.' }
  }

  saveSession({
    token: createSessionToken(invite.role),
    expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    role: invite.role,
  })

  return { success: true, role: invite.role }
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

/** Core authentication types — extend when backend is connected */

export interface AuthResult {
  success: boolean
  error?: string
  role?: UserRole
  demoSlug?: string
}

export interface AuthSession {
  token: string
  expiresAt: number
  role?: UserRole
  demoSlug?: string
}

export type UserRole = 'admin' | 'client'

export interface InviteCode {
  code: string
  role: UserRole
  expiresAt?: number
  usedAt?: number
}

export interface AuthUser {
  id: string
  role: UserRole
  inviteCode?: string
}

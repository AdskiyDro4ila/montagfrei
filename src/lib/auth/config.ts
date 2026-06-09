/** Auth configuration — override via .env in production */

export const ADMIN_ACCESS_CODE = 'admin'

export function getAdminPassword(): string {
  return import.meta.env.VITE_ADMIN_PASSWORD ?? 'montagfrei2026'
}

export function isAdminAccessCode(code: string): boolean {
  return code.trim().toLowerCase() === ADMIN_ACCESS_CODE
}

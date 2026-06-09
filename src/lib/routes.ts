/**
 * Route constants for current and future views.
 * Wire into a router when admin/client dashboards are built.
 */

export const ROUTES = {
  home: '/',
  access: '/access',
  admin: '/admin',
  client: '/client',
} as const

export type RouteKey = keyof typeof ROUTES

/** Current in-app views — maps to ROUTES when routing is added */
export type AppView = 'gallery' | 'code' | 'admin' | 'client'

export function viewToRoute(view: AppView): string {
  const map: Record<AppView, string> = {
    gallery: ROUTES.home,
    code: ROUTES.access,
    admin: ROUTES.admin,
    client: ROUTES.client,
  }
  return map[view]
}

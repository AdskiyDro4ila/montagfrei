/**
 * Route constants for current and future views.
 * Wire into a router when admin/client dashboards are built.
 */

export const ROUTES = {
  home: '/',
  access: '/access',
  admin: '/admin',
  demo: '/demo',
} as const

export function demoRoute(slug: string): string {
  return `/demo/${slug}`
}

export type RouteKey = keyof typeof ROUTES

/** Current in-app views — maps to ROUTES when routing is added */
export type AppView = 'gallery' | 'code' | 'admin' | 'demo'

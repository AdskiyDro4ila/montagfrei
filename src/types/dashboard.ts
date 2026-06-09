/**
 * Placeholder types for future dashboard implementations.
 * Do not use until admin/client views are built.
 */

import type { UserRole } from '../lib/auth'

export interface DashboardNavItem {
  label: string
  path: string
}

export interface DashboardConfig {
  role: UserRole
  title: string
  nav: DashboardNavItem[]
}

export interface AdminDashboardProps {
  // Reserved for admin dashboard root
}

export interface ClientDashboardProps {
  // Reserved for client dashboard root
}

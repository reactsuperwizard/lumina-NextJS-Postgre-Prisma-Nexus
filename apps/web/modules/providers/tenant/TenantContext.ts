import React from 'react'
import type { PermissionsRole } from '@lumina/api'
export interface ITenantContext {
  tenant: string | null
  name: string | null
  active: boolean
  isLuminaAdmin: boolean | null
  isLuminaScripter: boolean | null
  isLuminaManager: boolean | null
  isTenantAdmin: boolean | null
  isTenantUser: boolean | null
  isPaid: boolean | null
  loading: boolean | null
  email: { role: PermissionsRole } | null
  redirectToCustomer: () => void
  activateCustomer: () => void
}

export const TenantContext = React.createContext<ITenantContext | null>(null)

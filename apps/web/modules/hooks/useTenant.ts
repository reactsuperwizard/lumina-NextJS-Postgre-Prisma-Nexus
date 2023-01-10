import { useContext } from 'react'
import { TenantContext } from 'modules/providers'

export const useTenant = () => useContext(TenantContext)!

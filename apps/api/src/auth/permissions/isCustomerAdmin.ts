import { Context } from '../../Context'

import { NexusGenFieldTypes } from '../../../generated/nexusTypes'
import { managementClient } from '../../auth/managementClient'
import { PermissionsRole } from '../../../generated/graphql'
// Must be customer admin
export const isCustomerAdmin = async (
  ctx: Context,
  tenant: NexusGenFieldTypes['Customer']['tenant'],
): Promise<boolean> => {
  const userData = await managementClient.getUser({ id: ctx.user?.sub! })

  if (Array.isArray(userData.app_metadata?.tenants?.[tenant]?.role))
    return !!userData.app_metadata?.tenants?.[tenant]?.role.includes(
      PermissionsRole.Admin,
    )
  else
    return (
      userData.app_metadata?.tenants?.[tenant]?.role == PermissionsRole.Admin
    )
}

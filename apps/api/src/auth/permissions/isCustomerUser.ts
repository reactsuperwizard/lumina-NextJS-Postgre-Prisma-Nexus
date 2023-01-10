import { Context } from '../../Context'

import { NexusGenFieldTypes } from '../../../generated/nexusTypes'
import { managementClient } from '../../auth/managementClient'
import { PermissionsRole } from '../../../generated/graphql'

// Must be a user associated with the customer
export const isCustomerUser = async (
  ctx: Context,
  tenant: NexusGenFieldTypes['Request']['customerTenant'],
): Promise<boolean> => {
  const userData = await managementClient.getUser({ id: ctx.user?.sub! })
  if (Array.isArray(userData.app_metadata?.tenants?.[tenant]?.role))
    return !!userData.app_metadata?.tenants?.[tenant]?.role.includes(
      PermissionsRole.User,
    )
  else
    return (
      userData.app_metadata?.tenants?.[tenant]?.role == PermissionsRole.User
    )
}

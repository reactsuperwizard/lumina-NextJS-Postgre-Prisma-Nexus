import { PermissionsRole } from '../../../generated/graphql'
import type { Context } from '../../Context'

// Must have lumina tenant
export const isLuminaUser = (ctx: Context): boolean => {
  if (ctx.user?.tenants) {
    // Handles both array and string
    return ctx.user?.tenants?.lumina?.role.length > 0
  }
  return false
}

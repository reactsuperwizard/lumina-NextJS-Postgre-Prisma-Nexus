import { PermissionsRole } from '../../../generated/graphql'
import type { Context } from '../../Context'
import { Permission } from './Permission'

// Must be lumina admin or 'render'
export const isLuminaAdmin = (ctx: Context): boolean => {
  // render app currently has ['read:*', 'write:*']
  // const apiPermissions: Permission[] = ['read:*', 'write:*']
  // if (ctx.user?.permissions) {
  //   return apiPermissions.every((p) => ctx.user?.permissions?.includes(p))
  // }
  if (ctx.user?.tenants) {
    if (Array.isArray(ctx.user?.tenants?.lumina?.role))
      return ctx.user?.tenants?.lumina?.role.includes(PermissionsRole.Admin)
    else return ctx.user?.tenants?.lumina?.role == PermissionsRole.Admin
  }
  return false
}

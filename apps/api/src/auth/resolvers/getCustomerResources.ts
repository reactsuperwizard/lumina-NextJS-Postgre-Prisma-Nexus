import { Context } from '../../Context'

import { ForbiddenError } from 'apollo-server-lambda'
import { GraphQLResolveInfo } from 'graphql'

export const getCustomerResources: any = async (
  root: any,
  args: any,
  ctx: Context,
  info: GraphQLResolveInfo,
  originalResolve: any,
) => {
  if (!ctx.user?.tenants) {
    throw new ForbiddenError('You must be logged in to make this query.')
  }
  if (args.where?.customerTenant) {
    throw new ForbiddenError(
      '{where: {customerTenant}} cannot be used with this query',
    )
  }
  try {
    const tenants = Object.keys(ctx.user.tenants)
    args.where = { ...args.where, customerTenant: { in: tenants } }
    const res = await originalResolve(root, args, ctx, info)
    if (res) {
      return res
    }
    return null
  } catch (e) {
    throw e
  }
}

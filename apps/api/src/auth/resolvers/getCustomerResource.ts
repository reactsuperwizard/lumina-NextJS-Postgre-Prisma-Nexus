import { Context } from '../../Context'

import { isCustomerAdmin } from '../permissions/isCustomerAdmin'
import { isLuminaAdmin } from '../permissions/isLuminaAdmin'
import { isCustomerUser } from '../permissions/isCustomerUser'

import { ForbiddenError } from 'apollo-server-lambda'
import { FieldResolver } from 'nexus'
import { GraphQLResolveInfo } from 'graphql'

export const getCustomerResource: any = async (
  root: any,
  args: any,
  ctx: Context,
  info: GraphQLResolveInfo,
  originalResolve:
    | FieldResolver<'Query', 'getCustomerRequest'>
    | FieldResolver<'Query', 'getCustomerOrder'>,
) => {
  try {
    const res = await originalResolve(root, args, ctx, info)
    if (res) {
      if (
        (await isCustomerAdmin(ctx, res.customerTenant)) ||
        (await isCustomerUser(ctx, res.customerTenant)) ||
        isLuminaAdmin(ctx)
      ) {
        return res
      }
      throw new ForbiddenError(`forboden.`)
    }
    return null
  } catch (e) {
    throw e
  }
}

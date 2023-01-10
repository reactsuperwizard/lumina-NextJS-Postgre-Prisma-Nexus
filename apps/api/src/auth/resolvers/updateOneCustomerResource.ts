import { Context } from '../../Context'
import { isCustomerAdmin } from '../permissions/isCustomerAdmin'
import { isLuminaAdmin } from '../permissions/isLuminaAdmin'
import { isCustomerUser } from '../permissions/isCustomerUser'

import { ForbiddenError } from 'apollo-server-lambda'
import { GraphQLResolveInfo } from 'graphql'

export const updateOneCustomerResource: any =
  (resourceName: string) =>
  // CustomFieldResolver<
  // 'Mutation',
  // 'updateOneCustomerRequest'
  // >
  async (
    root: any,
    args: any,
    ctx: Context,
    info: GraphQLResolveInfo,
    originalResolve: any,
  ) => {
    try {
      const prisma: any = ctx.prisma
      const res = await prisma[resourceName].findUnique({
        where: args.where,
      })
      if (res) {
        if (
          (await isCustomerAdmin(ctx, res.customerTenant)) ||
          (await isCustomerUser(ctx, res.customerTenant)) ||
          isLuminaAdmin(ctx)
        ) {
          return await originalResolve(root, args, ctx, info)
        }
      }
      throw new ForbiddenError(`forboden.`)
    } catch (e) {
      throw e
    }
  }

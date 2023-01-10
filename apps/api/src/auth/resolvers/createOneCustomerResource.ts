import { Context } from '../../Context'

import { CustomFieldResolver } from 'nexus-plugin-prisma/typegen'
import { isCustomerAdmin } from '../permissions/isCustomerAdmin'
import { isLuminaAdmin } from '../permissions/isLuminaAdmin'

import { ApolloError, ForbiddenError } from 'apollo-server-lambda'
import { isCustomerUser } from '../permissions/isCustomerUser'

export const createOneCustomerResource = (allowUser?: boolean) => {
  const createOneCustomerResourceMain: CustomFieldResolver<
    'Mutation',
    'createOneCustomerOrder'
  > &
    CustomFieldResolver<'Mutation', 'createOneCustomerRequest'> = async (
    root: any,
    args: { data: any },
    ctx: Context,
    info: any,
    originalResolve: any,
  ) => {
    try {
      const { data } = args
      const customerConnect = data?.customer?.connect
      if (!customerConnect) {
        throw new ApolloError(
          'Must provide a customer to connect a resource to.',
        )
      }
      const prisma: any = ctx.prisma
      const res = await prisma.customer.findUnique({
        where: customerConnect,
      })
      const isAllowedUser = allowUser && (await isCustomerUser(ctx, res.tenant))
      if (res) {
        if (
          (await isCustomerAdmin(ctx, res.tenant)) ||
          isLuminaAdmin(ctx) ||
          isAllowedUser
        ) {
          return await originalResolve(root, args, ctx, info)
        }
      }
      throw new ForbiddenError(`forboden.`)
    } catch (e) {
      throw e
    }
  }
  return createOneCustomerResourceMain
}

import { CustomFieldResolver } from 'nexus-plugin-prisma/typegen'
import { isCustomerAdmin } from '../permissions/isCustomerAdmin'
import { isLuminaAdmin } from '../permissions/isLuminaAdmin'
import { isCustomerUser } from '../permissions/isCustomerUser'

import { ForbiddenError } from 'apollo-server-lambda'
import { isLuminaUser } from '../permissions/isLuminaUser'

export const getCustomer: CustomFieldResolver<'Query', 'getCustomer'> = async (
  root,
  args,
  ctx,
  info,
  originalResolve,
) => {
  try {
    const res = await originalResolve(root, args, ctx, info)
    if (res) {
      if (
        (await isCustomerAdmin(ctx, res.tenant)) ||
        (await isCustomerUser(ctx, res.tenant)) ||
        isLuminaUser(ctx)
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

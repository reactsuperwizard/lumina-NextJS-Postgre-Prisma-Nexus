import { FieldResolver } from 'nexus'

import { CustomFieldResolver } from 'nexus-plugin-prisma/typegen'
import { RequestStatus } from '.prisma/client'
import type { Prisma } from '.prisma/client'

export const totalScripts: FieldResolver<'Query', 'totalScripts'> = async (
  _root,
  args,
  ctx,
) => {
  const whereArg = args.where as Prisma.ScriptFindManyArgs['where']
  const count = await ctx.prisma.script.count({ where: whereArg })
  return { count }
}

export const createOneScript: CustomFieldResolver<
  'Mutation',
  'createOneScript'
> = async (root, args, ctx, info, originalResolve) => {
  try {
    const { data } = args
    const { request } = data
    const requestId = request?.connect?.id
    if (requestId) {
      await ctx.prisma.request.update({
        where: { id: requestId },
        data: {
          status: { set: RequestStatus.scripting },
          inProgressAt: { set: new Date() },
        },
      })
    }
    return await originalResolve(root, args, ctx, info)
  } catch (e) {
    throw e
  }
}

export const deleteOneScript: CustomFieldResolver<
  'Mutation',
  'deleteOneScript'
> = async (root, args, ctx, info, originalResolve) => {
  try {
    const { where } = args
    const { id } = where
    if (id) {
      await ctx.prisma.render.deleteMany({
        where: { scriptId: id },
      })
    }
    return await originalResolve(root, args, ctx, info)
  } catch (e) {
    throw e
  }
}

export const totalCustomers: FieldResolver<'Query', 'totalCustomers'> = async (
  _root,
  args,
  ctx,
) => {
  const whereArg = args.where as Prisma.CustomerFindManyArgs['where']
  const count = await ctx.prisma.customer.count({ where: whereArg })
  return { count }
}

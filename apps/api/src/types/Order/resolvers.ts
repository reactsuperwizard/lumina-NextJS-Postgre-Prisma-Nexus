import { FieldResolver } from 'nexus'
import type { Prisma } from '.prisma/client'

export const totalOrders: FieldResolver<'Query', 'totalOrders'> = async (
  _root,
  args,
  ctx,
) => {
  const whereArg = args.where as Prisma.OrderFindManyArgs['where']
  const count = await ctx.prisma.order.count({ where: whereArg })
  return { count }
}

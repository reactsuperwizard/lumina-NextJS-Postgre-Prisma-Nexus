import { FieldResolver } from 'nexus'
import type { Prisma } from '.prisma/client'

export const totalPlatforms: FieldResolver<'Query', 'totalPlatforms'> = async (
  _root,
  args,
  ctx,
) => {
  const whereArg = args.where as Prisma.PlatformFindManyArgs['where']
  const count = await ctx.prisma.customer.count({ where: whereArg })
  return { count }
}

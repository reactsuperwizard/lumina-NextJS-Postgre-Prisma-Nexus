import { FieldResolver } from 'nexus'
import { RequestStatus } from '.prisma/client'

export const averageRequestCompletion: FieldResolver<
  'Query',
  'avgRequestCompletion'
> = async (_root, args, ctx) => {
  const { start, end } = args
  const requests = await ctx.prisma.request.findMany({
    where: {
      status: { equals: RequestStatus.completed },
      completedAt: {
        gte: new Date(start),
        lte: new Date(end),
      },
      NOT: {
        customerTenant: '@lumina',
      },
    },
  })

  const diffs = requests.map((r) => {
    if (r.completedAt) {
      return +r.completedAt - +r.createdAt
    }
    return 0
  })
  if (diffs.length > 0) {
    const avgDiff =
      diffs.reduce((sume, el) => {
        if (el) {
          return sume + el
        }
        return sume
      }, 0) / diffs.length
    return avgDiff
  }
  return null
}
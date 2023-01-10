import { objectType, extendType, arg } from 'nexus'

import { Prisma } from '@prisma/client'
import { isLuminaAdmin } from '../auth'

export const Subscription = objectType({
  name: 'Sub',
  definition(t) {
    t.model.id()
    t.model.customer()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.yearlyVideoCap()
    t.model.liveVideoCap()
    t.model.tier()
  },
})

export const SubscriptionQueries = extendType({
  type: 'Query',
  definition(t) {
    t.crud.sub({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.subs({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      ordering: true,
      pagination: true,
      filtering: true,
    })
    t.field('totalSubs', {
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      description: 'Total number of subscriptions for use with pagination.',
      type: 'Count',
      args: {
        where: arg({ type: 'SubWhereInput' }),
      },
      nullable: true,
      async resolve(_root, args, ctx) {
        const whereArg = args.where as Prisma.SubFindManyArgs['where']
        const count = await ctx.prisma.sub.count({ where: whereArg })
        return { count }
      },
    })
  },
})

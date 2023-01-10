import { arg, extendType } from 'nexus'
import { isLuminaAdmin } from '../../auth'
import { averageRequestCompletion } from './resolvers'

export const ProductionAnalytics = extendType({
  type: 'Query',
  definition(t) {
    t.field('avgRequestCompletion', {
      type: 'Float',
      nullable: true,
      description:
        'Return the average time requests beween a given date range take from created at to completed at in milliseconds.',
      args: {
        start: arg({ required: true, type: 'DateTime' }),
        end: arg({ required: true, type: 'DateTime' }),
      },
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      resolve: averageRequestCompletion
    })
  },
})

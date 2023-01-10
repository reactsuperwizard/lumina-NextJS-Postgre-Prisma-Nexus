import { extendType } from 'nexus'
import { isLuminaAdmin } from '../auth'

// random resolver for quick prototyping something
export const ExperimentQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('test', {
      type: 'Boolean',
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      resolve: async () => {
        return true
      },
    })
  },
})

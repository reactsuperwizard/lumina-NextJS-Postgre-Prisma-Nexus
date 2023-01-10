import { extendType, nonNull, arg, list } from 'nexus'
import { isLuminaAdmin } from '../../auth'
import { getFlavor, getFlavors, getMultipleFlavors } from './resolvers'

export const FlavorQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('flavor', {
      type: 'JSON',
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      args: {
        name: nonNull(arg({ type: 'TemplateFlavor' })),
      },
      resolve: getFlavor,
    })
    t.field('flavors', {
      type: 'JSON',
      resolve: getFlavors,
    })
    t.field('flavorsMultiple', {
      type: 'JSON',
      args: {
        name: nonNull(list(nonNull('TemplateFlavor'))),
      },
      resolve: getMultipleFlavors,
    })
  },
})

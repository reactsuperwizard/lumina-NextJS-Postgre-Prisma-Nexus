import { objectType, extendType, arg } from 'nexus'
import { isLuminaAdmin } from '../../auth'
import { totalPlatforms } from './resolvers'

export const Platform = objectType({
  name: 'Platform',
  description: 'ATS type for customer behaviors',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.url()
    t.model.customers({ authorize: (_root, _args, ctx) => isLuminaAdmin(ctx) })
    t.model.createdAt()
    t.model.updatedAt()
  },
})

export const PlatformQueries = extendType({
  type: 'Query',
  definition(t) {
    t.crud.platform({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.platforms({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      ordering: true,
      pagination: true,
      filtering: true,
    })
    t.field('totalPlatforms', {
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      description: 'Total number of customers for use with pagination.',
      type: 'Count',
      args: {
        where: arg({ type: 'PlatformWhereInput' }),
      },
      nullable: true,
      resolve: totalPlatforms,
    })
  },
})

export const PlatformMutations = extendType({
  type: 'Mutation',
  definition(t) {
    // Platform
    t.crud.createOnePlatform({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.updateOnePlatform({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.deleteOnePlatform({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.updateManyPlatform({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.deleteManyPlatform({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
  },
})
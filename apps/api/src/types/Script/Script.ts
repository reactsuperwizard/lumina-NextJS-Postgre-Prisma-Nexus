import { objectType, extendType, arg } from 'nexus'
import { isLuminaAdmin, isLuminaUser } from '../../auth'
import { createOneScript, deleteOneScript, totalScripts } from './resolvers'

export const Script = objectType({
  name: 'Script',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.customerTenant()
    t.model.customer({ authorize: (_root, _args, ctx) => isLuminaUser(ctx) })
    t.model.order({ authorize: (_root, _args, ctx) => isLuminaUser(ctx) })
    t.model.request({ authorize: (_root, _args, ctx) => isLuminaUser(ctx) })
    t.model.producer({ authorize: (_root, _args, ctx) => isLuminaUser(ctx) })
    t.model.video({ authorize: (_root, _args, ctx) => isLuminaUser(ctx) })
    t.model.renders({ authorize: (_root, _args, ctx) => isLuminaUser(ctx) })
    t.model.variables()
    t.model.layers()
    t.model.globals()
    t.model.slides()
    t.model.flavor()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.customerUpdate()
  },
})

export const ScriptQueries = extendType({
  type: 'Query',
  definition(t) {
    t.crud.script({
      authorize: (_root, _args, ctx) => isLuminaUser(ctx),
    })
    t.crud.scripts({
      authorize: (_root, _args, ctx) => isLuminaUser(ctx),
      ordering: true,
      pagination: true,
      filtering: true,
    })
    t.field('totalScripts', {
      authorize: (_root, _args, ctx) => isLuminaUser(ctx),
      description: 'Total number of jobs for use with pagination.',
      type: 'Count',
      args: {
        where: arg({ type: 'ScriptWhereInput' }),
      },
      nullable: true,
      resolve: totalScripts,
    })
  },
})

export const ScriptMutations = extendType({
  type: 'Mutation',
  definition(t) {
    // Script
    t.crud.createOneScript({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      resolve: createOneScript,
    })
    t.crud.updateOneScript()
    t.crud.deleteOneScript({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      resolve: deleteOneScript,
    })
    t.crud.deleteManyScript({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
  },
})

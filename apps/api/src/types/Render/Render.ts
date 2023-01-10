import { objectType, extendType } from 'nexus'

import { isLuminaAdmin } from '../../auth'

export const Render = objectType({
  name: 'Render',
  definition(t) {
    t.model.id()
    t.model.video()
    t.model.script()
    t.model.status()
    t.model.error()
    t.model.progress()
    t.model.queuedAt()
    t.model.updatedAt()
  },
})

export const RenderQueries = extendType({
  type: 'Query',
  definition(t) {
    t.crud.render({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.renders({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      filtering: true,
      ordering: true,
      pagination: true,
    })
  },
})

export const RenderMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneRender({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.updateOneRender({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.deleteOneRender({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.deleteManyRender({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.updateManyRender({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
  },
})

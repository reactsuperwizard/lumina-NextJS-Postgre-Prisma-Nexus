import { mutationType } from 'nexus'
import { isLuminaAdmin } from '../auth'

export const Mutation = mutationType({
  definition(t) {
    // Script
    t.crud.createOneScript({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.updateOneScript()
    t.crud.upsertOneScript({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.deleteOneScript({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.updateManyScript({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.deleteManyScript({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    // Sub
    t.crud.createOneSub({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.updateOneSub({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })

    t.crud.deleteOneSub({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.updateManySub({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.deleteManySub({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
  },
})

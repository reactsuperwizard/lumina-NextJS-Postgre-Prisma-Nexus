import { objectType, extendType } from 'nexus'
import { isLuminaAdmin, isLuminaUser } from '../auth'

export const Folder = objectType({
  name: 'Folder',
  description: 'Folder type for organization of Assets',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.parent()
    t.model.children({
      ordering: true,
    })
    t.model.assets({
      ordering: true,
    })
    t.model.customer()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

export const FolderQueries = extendType({
  type: 'Query',
  definition(t) {
    t.crud.folder({
      authorize: (_root, _args, ctx) => isLuminaUser(ctx),
    })
    t.crud.folders({
      authorize: (_root, _args, ctx) => isLuminaUser(ctx),
      ordering: true,
      pagination: true,
      filtering: true,
    })
  },
})

export const FolderMutations = extendType({
  type: 'Mutation',
  definition(t) {
    // Folder
    t.crud.createOneFolder({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.updateOneFolder({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.deleteOneFolder({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.updateManyFolder({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.deleteManyFolder({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
  },
})

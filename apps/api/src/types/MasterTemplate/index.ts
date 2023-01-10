import { objectType, extendType, arg } from 'nexus'

import { isLuminaAdmin } from '../../auth'

export const MasterTemplate = objectType({
  name: 'MasterTemplate',
  description: 'Master Template',
  definition(t) {
    t.model.id()
    t.model.customer()
    t.model.customerId()
    t.model.layers()
    t.model.flavor()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

export const MasterTemplateQueries = extendType({
  type: 'Query',
  definition(t) {
    t.crud.masterTemplate({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.masterTemplates({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      ordering: true,
      pagination: true,
      filtering: true,
    })
  },
})

export const MasterTemplateMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneMasterTemplate({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.updateOneMasterTemplate({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
  },
})

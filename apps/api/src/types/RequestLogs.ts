import { objectType, extendType } from 'nexus'
import { isLuminaAdmin } from '../auth'

export const RequestLog = objectType({
  name: 'RequestLog',
  description: 'Request Logs',
  definition(t) {
    t.model.id()
    t.model.request()
    t.model.event()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.user()
    t.model.userId()
  },
})

export const RequestLogQueries = extendType({
  type: 'Query',
  definition(t) {
    t.crud.requestLog({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.requestLogs({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      ordering: true,
      pagination: true,
      filtering: true,
    })
  },
})

export const RequestLogMutations = extendType({
  type: 'Mutation',
  definition(t) {
    // Request Log
    t.crud.createOneRequestLog({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.updateOneRequestLog({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.deleteOneRequestLog({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
  },
})

import { objectType, extendType, arg } from 'nexus'
import {
  isLuminaAdmin,
  getCustomerResource,
  getCustomerResources,
  isLuminaUser,
} from '../../auth'
import {
  createOneRequest,
  createOneCustomerRequest,
  updateOneCustomerRequest,
  updateOneRequest,
  totalRequests,
  returnRequestToSubmissionQueue,
  acceptRequest,
} from './resolvers'

export const Request = objectType({
  name: 'Request',
  definition(t) {
    t.model.id()
    t.model.status()
    t.model.submittedAt()
    t.model.inProgressAt()
    t.model.basePrice()
    t.model.bonusPrice()
    t.model.bonusDeadline()
    t.model.logs()
    t.model.completedAt()
    t.model.cancelledAt()
    t.model.cancelledReason()
    t.model.message()
    t.model.notes()
    t.model.jobTitle()
    t.model.url()
    t.model.order()
    t.model.orderId()
    t.model.owner({ authorize: (_root, _args, ctx) => isLuminaUser(ctx) })
    t.model.script({ authorize: (_root, _args, ctx) => isLuminaUser(ctx) })
    t.model.video({ authorize: (_root, _args, ctx) => isLuminaUser(ctx) })
    t.model.customer({ authorize: (_root, _args, ctx) => isLuminaUser(ctx) })
    t.model.customerTenant()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.submittedBy()
    t.model.slackTs({ authorize: (_root, _args, ctx) => isLuminaUser(ctx) })
    t.model.template()
  },
})

export const RequestQueries = extendType({
  type: 'Query',
  definition(t) {
    // LUMINA ADMIN
    t.crud.request({
      authorize: (_root, _args, ctx) => isLuminaUser(ctx),
    })
    t.crud.requests({
      authorize: (_root, _args, ctx) => isLuminaUser(ctx),
      ordering: true,
      pagination: true,
      filtering: true,
    })
    t.field('totalRequests', {
      authorize: (_root, _args, ctx) => isLuminaUser(ctx),
      description: 'Total number of jobs for use with pagination.',
      type: 'Count',
      args: {
        where: arg({ type: 'RequestWhereInput' }),
      },
      nullable: true,
      resolve: totalRequests,
    })
    t.crud.request({
      alias: 'getCustomerRequest',
      resolve: getCustomerResource,
    })
    t.crud.requests({
      alias: 'getCustomerRequests',
      resolve: getCustomerResources,
      ordering: true,
      pagination: true,
      filtering: true,
    })
  },
})

export const RequestMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.updateOneRequest({
      authorize: (_root, args, ctx, info) => isLuminaAdmin(ctx),
      resolve: updateOneRequest,
    })
    t.crud.createOneRequest({
      authorize: (_root, args, ctx, info) => isLuminaAdmin(ctx),
      resolve: createOneRequest,
    })
    t.crud.deleteOneRequest({
      authorize: (_root, args, ctx, info) => isLuminaAdmin(ctx),
    })
    t.crud.updateOneRequest({
      alias: 'updateOneCustomerRequest',
      resolve: updateOneCustomerRequest,
    })
    t.crud.createOneRequest({
      alias: 'createOneCustomerRequest',
      resolve: createOneCustomerRequest,
    })
    t.field('returnRequestToSubmissionQueue', {
      type: 'Request',
      resolve: returnRequestToSubmissionQueue,
      authorize: (_root, args, ctx, info) => isLuminaUser(ctx),
      args: {
        where: arg({
          type: 'RequestWhereUniqueInput',
          nullable: false,
        }),
      },
    })
    t.field('acceptRequest', {
      type: 'Script',
      resolve: acceptRequest,
      authorize: (_root, args, ctx, info) => isLuminaUser(ctx),
      args: {
        where: arg({
          type: 'RequestWhereUniqueInput',
          nullable: false,
        }),
      },
    })
  },
})

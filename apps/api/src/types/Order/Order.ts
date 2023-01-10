import { objectType, extendType, arg } from 'nexus'
import {
  getCustomerResource,
  getCustomerResources,
  isLuminaAdmin,
  updateOneCustomerResource,
  createOneCustomerResource,
} from '../../auth'
import { totalOrders } from './resolvers'

export const Order = objectType({
  name: 'Order',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.customer()
    t.model.customerTenant()
    t.model.scripts({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      ordering: true,
    })
    t.model.videos({ ordering: true })
    t.model.requests({ ordering: true })
    t.model.status()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

export const OrderQueries = extendType({
  type: 'Query',
  definition(t) {
    t.crud.order({ authorize: (_root, _args, ctx) => isLuminaAdmin(ctx) })
    t.crud.orders({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      ordering: true,
      pagination: true,
      filtering: true,
    })
    t.field('totalOrders', {
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      description: 'Total number of orders for use with pagination.',
      type: 'Count',
      args: {
        where: arg({ type: 'OrderWhereInput' }),
      },
      nullable: true,
      resolve: totalOrders,
    })
    // Customer Portal
    t.crud.order({
      alias: 'getCustomerOrder',
      resolve: getCustomerResource,
    })
    t.crud.orders({
      alias: 'getCustomerOrders',
      resolve: getCustomerResources,
    })
  },
})

export const OrderMutations = extendType({
  type: 'Mutation',
  definition(t) {
    // Order
    t.crud.createOneOrder({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.updateOneOrder({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.deleteOneOrder({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.updateManyOrder({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.deleteManyOrder({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.updateOneOrder({
      alias: 'updateOneCustomerOrder',
      resolve: updateOneCustomerResource('order'),
    })
    t.crud.createOneOrder({
      alias: 'createOneCustomerOrder',
      resolve: createOneCustomerResource(true),
    })
  },
})

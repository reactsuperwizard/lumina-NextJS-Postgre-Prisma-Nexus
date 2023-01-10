import { objectType, extendType, arg } from 'nexus'

import { slugify } from '../../utils'
import { isLuminaAdmin, isLuminaUser } from '../../auth'
import { NexusGenArgTypes } from '../../../generated/nexusTypes'
import {
  createOneCustomer,
  totalCustomers,
  updateOneCustomer,
} from './resolvers'
import { getCustomer } from '../../auth/resolvers/getCustomer'

export const Customer = objectType({
  name: 'Customer',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.orders({
      ordering: true,
    })
    t.model.requests({
      filtering: true,
      ordering: true,
    })
    t.model.videos({
      filtering: true,
      ordering: true,
    })
    t.model.scripts({
      filtering: true,
      ordering: true,
    })
    t.model.users()
    t.model.slug()
    t.model.tenant()
    t.model.mappings()
    t.model.quickbooksId({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.model.pipedriveId({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.model.hsCompanyId({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.model.createdAt()
    t.model.updatedAt()
    t.model.platform()
    t.model.active()
    t.model.canRevise({ authorize: (_root, _args, ctx) => isLuminaAdmin(ctx) })
    t.model.notes({ authorize: (_root, _args, ctx) => isLuminaUser(ctx) })
    t.model.isPaid()
    t.model.approvedTemplates()
    t.model.requestedTemplates()
    t.model.defaultTemplate()
  },
})

export const slug = ({
  args: {
    data: { name },
  },
}: {
  args: NexusGenArgTypes['Mutation']['createOneCustomer']
}): string => {
  return slugify(name)
}

export const CustomerQueries = extendType({
  type: 'Query',
  definition(t) {
    // Lumina Admin
    t.crud.customer({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.customers({
      // authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      ordering: true,
      pagination: true,
      filtering: true,
    })
    t.field('totalCustomers', {
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      description: 'Total number of customers for use with pagination.',
      type: 'Count',
      args: {
        where: arg({ type: 'CustomerWhereInput' }),
      },
      nullable: true,
      resolve: totalCustomers,
    })
    // CUSTOMER PORTAL
    t.crud.customer({
      alias: 'getCustomer',
      resolve: getCustomer,
    })
  },
})

export const CustomerMutations = extendType({
  type: 'Mutation',
  definition(t) {
    // Customer
    t.crud.createOneCustomer({
      // authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      computedInputs: {
        slug,
        tenant: slug,
      },
      resolve: createOneCustomer,
    })
    t.crud.updateOneCustomer({
      // authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      resolve: updateOneCustomer,
    })
    t.crud.deleteOneCustomer({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.updateManyCustomer({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.deleteManyCustomer({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
  },
})

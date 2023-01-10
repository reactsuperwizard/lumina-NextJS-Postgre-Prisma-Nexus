import {
  objectType,
  stringArg,
  extendType,
  arg,
  enumType,
  nonNull,
  booleanArg,
  list,
} from 'nexus'

import { isLuminaAdmin } from '../../auth'

import {
  updateUserPermissions,
  deleteOneUser,
  updateOneUser,
  createAuth0User,
  sendOnBoardingEmail,
  tenants,
  totalUsers,
  me,
  updateMe,
  lastLogin,
  isUserActive,
  login,
  userSignUp,
  forgotPasswordResolver,
  sendTeammateInvitations,
  userSignUpWithCustomer,
} from './resolvers'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.email()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.customers()
    t.model.requests({ ordering: true })
    t.model.submittedRequests({ ordering: true })
    t.model.firstName()
    t.model.lastName()
    t.model.authId()
    t.model.onboarding()
    t.model.slackId()
    t.model.optOut()
    t.model.avatar()
    t.model.hasFreeRequest()
    t.model.freeRequest()
    t.model.freeRequestId()
    t.model.isApproved()
    t.json('tenants', {
      description: 'Return the auth0 tenants associated with a user.',
      resolve: tenants,
    })
    t.string('lastLogin', {
      description: 'Return the last time a user logged in.',
      resolve: lastLogin,
    })
    t.boolean('isUserActive', {
      description: 'Checks if user is active.',
      resolve: isUserActive,
    })
    t.model.hsContactId({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.model.loginHistory({ ordering: true })
  },
})

export const UserQueries = extendType({
  type: 'Query',
  definition(t) {
    t.crud.user({
      // authorize: async (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.users({
      ordering: true,
      pagination: true,
      filtering: true,
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.field('totalUsers', {
      description: 'Total number of users for use with pagination.',
      type: 'Count',
      args: {
        where: arg({ type: 'UserWhereInput' }),
      },
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      nullable: true,
      resolve: totalUsers,
    })
    t.crud.user({
      alias: 'me',
      resolve: me,
    })
  },
})

export const PermissionsRole = enumType({
  name: 'PermissionsRole',
  members: ['admin', 'user', 'scripter', 'manager'],
  description:
    "Admins have read and write access for everything.  User's can read everything for a given customer. Scripters are allowed only for scripting",
})

export const InviteEmailType = enumType({
  name: 'InviteEmailType',
  members: ['HOME_PAGE', 'VIDEO'],
  description: 'Invite type',
})

export const UserMutations = extendType({
  type: 'Mutation',
  definition(t) {
    // User
    t.crud.createOneUser({
      authorize: (_root, _args, ctx, _info) => isLuminaAdmin(ctx),
      computedInputs: {
        authId: createAuth0User,
      },
    })
    t.crud.updateOneUser({
      authorize: (_root, _args, ctx, _info) => isLuminaAdmin(ctx),
      resolve: updateOneUser,
    })

    t.crud.deleteOneUser({
      authorize: (_root, _args, ctx, _info) => isLuminaAdmin(ctx),
      resolve: deleteOneUser,
    })
    t.crud.deleteManyUser({
      authorize: (_root, _args, ctx, _info) => isLuminaAdmin(ctx),
    })
    t.field('updateUserPermissions', {
      type: 'User',
      args: {
        authId: nonNull(
          stringArg({
            description: 'AuthId of the user to update permissions for.',
          }),
        ),
        customerTenant: nonNull(
          stringArg({
            description: 'The tenant customer to update the permissions for.',
          }),
        ),
        role: arg({
          description:
            'If role is null, customer will be removed from tenants.',
          type: list('PermissionsRole'),
        }),
        isApproved: booleanArg({
          description: 'Update user as approved or not approved.',
        }),
        hasFreeRequest: booleanArg({
          description:
            'Boolean arg to indicate if the user has a free request.',
        }),
      },
      // authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      resolve: updateUserPermissions,
    })
    t.field('login', {
      type: 'Token',
      args: {
        email: nonNull(
          stringArg({
            description: 'Email of the user.',
          }),
        ),
        password: nonNull(
          stringArg({
            description: 'Password of the user.',
          }),
        ),
      },
      resolve: login,
    })
    t.field('userSignUp', {
      type: 'UserSignUpAndToken',
      args: {
        email: nonNull(
          stringArg({
            description: 'Email of the user.',
          }),
        ),
        password: nonNull(
          stringArg({
            description: 'Password of the user.',
          }),
        ),
        firstName: nonNull(
          stringArg({
            description: 'First name of the user.',
          }),
        ),
        lastName: nonNull(
          stringArg({
            description: 'Last name of the user.',
          }),
        ),
      },
      resolve: userSignUp,
    })
    t.field('userSignUpWithCustomer', {
      type: 'UserSignUpWithCustomerAndToken',
      args: {
        email: nonNull(
          stringArg({
            description: 'Email of the user.',
          }),
        ),
        password: nonNull(
          stringArg({
            description: 'Password of the user.',
          }),
        ),
        firstName: nonNull(
          stringArg({
            description: 'First name of the user.',
          }),
        ),
        lastName: nonNull(
          stringArg({
            description: 'Last name of the user.',
          }),
        ),
        jobTitle: nonNull(
          stringArg({
            description: 'Title of the job.',
          }),
        ),
        jobURL: nonNull(
          stringArg({
            description: 'URL of the job.',
          }),
        ),
        customerName: nonNull(
          stringArg({
            description: 'Name of the customer.',
          }),
        ),
        tenant: stringArg({
          description: 'Tenant of the customer.',
        }),
        template: nonNull(
          stringArg({
            description: 'Template of the request.',
          }),
        ),
      },
      resolve: userSignUpWithCustomer,
    })
    t.field('forgotPassword', {
      type: 'Success',
      args: {
        email: nonNull(
          stringArg({
            description: 'Email of the user.',
          }),
        ),
      },
      resolve: forgotPasswordResolver,
    })
    t.field('sendOnBoardingEmail', {
      type: 'User',
      nullable: false,
      args: {
        authId: stringArg({
          description: 'AuthId of the user to update permissions for.',
          required: true,
        }),
      },
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      resolve: sendOnBoardingEmail,
    })
    t.field('sendTeammateInvitations', {
      type: 'User',
      args: {
        authId: nonNull(
          stringArg({
            description: 'AuthId of the user to update permissions for.',
          }),
        ),
        customer: stringArg({
          description: 'Customer sender is linked too',
          required: true,
        }),
        emails: list(
          nonNull(
            stringArg({
              description: 'emails of people invited',
            }),
          ),
        ),
        type: nonNull(
          arg({
            description: 'Email Invite Type.',
            type: 'InviteEmailType',
          }),
        ),
      },
      resolve: sendTeammateInvitations,
    })
    t.crud.updateOneUser({
      alias: 'updateMe',
      resolve: updateMe,
    })
  },
})

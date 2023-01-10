/* eslint-disable @typescript-eslint/camelcase */
// import { NotAuthorizedError, InvalidTokenError } from './errors'
import {
  LocalMutationResolverParams,
  CustomFieldResolver,
} from 'nexus-plugin-prisma/typegen'
import { FieldResolver } from 'nexus'
import { ManagementClient, CreateUserData } from 'auth0'
import jwt, { JwtPayload } from 'jsonwebtoken'

import {
  ApolloError,
  ForbiddenError,
  AuthenticationError,
} from 'apollo-server-lambda'
import {
  forgotPassword,
  isLuminaAdmin,
  isLuminaUser,
  isMe,
  loginUser,
  Tenants,
} from '../../auth'
import { Onboarding } from './onboarding'

import {
  sendOnBoardingEmail as sndOnBoardingEmail,
  sendTeammateInvitations as sndTeammateInvitations,
} from './email'
import { Prisma, PrismaClient } from '.prisma/client'
import { decodeToken } from './token'
import { slugify } from '../../utils'
import { RequestStatus } from '@prisma/client'
import { notifyProductionNewRequest } from '../Request/slackIntegration'
import {
  notifyUserApproval,
  newUserSignsUp,
} from '../Production/slackIntegration'
import { PermissionsRole, TemplateFlavor } from '../../../generated/graphql'
import { getFlavorById } from '../Flavor/resolvers'
import { Flavor } from '@lumina/render/dist/src/flavors'

const managementClient = new ManagementClient({
  domain: 'dev-2fat32cy.auth0.com',
  clientId: process.env.AUTH0_CLIENT_ID || '1234', // fake this during the build process
  clientSecret: process.env.AUTH0_CLIENT_SECRET || '1234', // fake this during the build process
})

export const me: CustomFieldResolver<'Query', 'me'> = async (
  root,
  args,
  ctx,
  info,
  originalResolve,
) => {
  try {
    const res = await originalResolve(root, args, ctx, info)
    if (res && !isMe(ctx, res.authId) && !isLuminaAdmin(ctx)) {
      throw new ForbiddenError('You must only access your own information.')
    }
    return res
  } catch (e: any) {
    console.log('what is the error??', e)
    throw e
  }
}

export const updateMe: CustomFieldResolver<'Mutation', 'updateMe'> = async (
  root,
  args,
  ctx,
  info,
  originalResolve,
) => {
  try {
    const res = await originalResolve(root, args, ctx, info)
    if (!res?.authId) {
      throw new ApolloError(
        'authId must be provided in `where` clause when using this mutation',
      )
    }
    if (!isMe(ctx, res?.authId) && !isLuminaAdmin(ctx)) {
      throw new ForbiddenError(
        'You must only access your own information or be an admin.',
      )
    }
    return await originalResolve(root, args, ctx, info)
  } catch (e: any) {
    throw e
  }
}

export const totalUsers: FieldResolver<'Query', 'totalUsers'> = async (
  _root,
  args,
  ctx,
) => {
  if (!isLuminaAdmin(ctx)) {
    throw new Error('You must be an admin to read this resource by id!')
  }
  const whereArg = args.where as Prisma.UserFindManyArgs['where']
  const count = await ctx.prisma.user.count({ where: whereArg })
  return { count }
}

export const tenants: FieldResolver<'User', 'tenants'> = async (
  root,
  _args,
  ctx,
) => {
  // the currently logged in user needs their tenants
  // if (root.authId === ctx.user?.sub) return ctx.user.tenants
  if ((isLuminaUser(ctx) && root.authId) || root.authId === ctx.user?.sub) {
    //TODO: authId should be required
    try {
      const auth0User = await managementClient.getUser({ id: root.authId })
      const tenants = auth0User.app_metadata?.tenants || null
      return tenants
    } catch (err) {
      return {}
    }
  }
  throw new Error('You must be an admin to view another users permissions')
}

export const lastLogin: FieldResolver<'User', 'lastLogin'> = async (
  root,
  _args,
  ctx,
) => {
  if (isLuminaAdmin(ctx) && root.authId) {
    const auth0User = await managementClient.getUser({
      id: root.authId,
    })
    const lastLogin = auth0User.last_login || null
    return lastLogin
  }
  throw new Error('You must be an admin to view another users last login.')
}

export const isUserActive: FieldResolver<'User', 'isUserActive'> = async (
  root,
  _args,
  ctx,
) => {
  try {
    if (root.authId) {
      const auth0User = await managementClient.getUser({
        id: root.authId,
      })
      const lastLogin = auth0User.last_login || null
      if (!lastLogin) return false
      else
        return (
          new Date().getTime() - new Date(lastLogin).getTime() <
          30 * 24 * 60 * 60 * 1000
        )
    }
    return false
  } catch (err) {
    return false
  }
}

export const updateOneUser: CustomFieldResolver<
  'Mutation',
  'updateOneUser'
> = async (root, args, ctx, info, originalResolve) => {
  // TODO isAdmin or isCustomerAdmin
  const { email } = args.data
  if (email?.set) {
    const { authId } = args.where
    if (!authId) {
      throw new Error("authId is required when updating a user's email.")
    }
    managementClient.updateUser({ id: authId }, { email: email.set })
  }
  const res = await originalResolve(root, args, ctx, info)
  return res
}

// REFACTOR to manage users by email, not AuthId!!!!
// Create Custom Type
// store token only from sign up

export const createAuth0User: ({
  args,
}: LocalMutationResolverParams<'createOneUser'>) => Promise<string> = async ({
  args,
}) => {
  const { email, firstName, lastName } = args.data

  try {
    const createUserData: CreateUserData = {
      email,
      connection: 'Username-Password-Authentication',
      verify_email: false,
      email_verified: false,
      password: 'OSfwOF[WEH[F0EW0YFWEwe6wefuhfwehweiuhewI',
      ...(firstName && { given_name: firstName }),
      ...(lastName && { family_name: lastName }),
    }
    const auth0User = await managementClient.createUser(createUserData)
    console.log(auth0User)

    const authId = auth0User.user_id

    if (!authId) {
      throw new Error(`authId not returned when creating user ${email}`)
    } else {
      return authId
    }
  } catch (e: any) {
    if (e.statusCode === 409) {
      console.error(`User with email ${email} already exists`)
      throw new Error(
        `Could user with ${email} already exists in Auth0.  Ask an engineer to fix!`,
      )
    }
    throw e
  }
}

export const userSignUp: FieldResolver<'Mutation', 'userSignUp'> = async (
  root,
  args,
  ctx,
  info,
) => {
  const { email, firstName, lastName, password } = args
  try {
    const createUserData: CreateUserData = {
      email,
      connection: 'Username-Password-Authentication',
      verify_email: false,
      email_verified: false,
      password: password,
      ...(firstName && { given_name: firstName }),
      ...(lastName && { family_name: lastName }),
    }
    const auth0User = await managementClient.createUser(createUserData)
    const authId = auth0User.user_id

    if (!authId) {
      throw new Error(`authId not returned when creating user ${email}`)
    } else {
      const userRes = await ctx.prisma.user.create({
        data: {
          email: email.toLowerCase(),
          authId,
          firstName,
          lastName,
          hasFreeRequest: true,
          isApproved: false,
        },
      })
      newUserSignsUp({ userId: userRes.id })
      const loginResponse = await loginUser(email, password)
      if (loginResponse.error) {
        throw new AuthenticationError(loginResponse.error_description)
      }

      const { decodedToken, exp } = decodeToken(loginResponse.id_token)
      return {
        accessToken: loginResponse.access_token,
        idToken: loginResponse.id_token,
        expiresIn: loginResponse.expires_in,
        expiresAt: exp,
        decodedToken,
      }
    }
  } catch (e: any) {
    if (e.statusCode === 409) {
      console.error(`User with email ${email} already exists`)
      throw new Error(
        `Could user with ${email} already exists in Auth0.  Ask an engineer to fix!`,
      )
    }
    throw e
  }
}

export const userSignUpWithCustomer: FieldResolver<
  'Mutation',
  'userSignUpWithCustomer'
> = async (root, args, ctx, info) => {
  const {
    email,
    firstName,
    lastName,
    password,
    tenant,
    customerName,
    jobTitle,
    jobURL,
    template,
  } = args
  try {
    const createUserData: CreateUserData = {
      email,
      connection: 'Username-Password-Authentication',
      verify_email: false,
      email_verified: false,
      password: password,
      ...(firstName && { given_name: firstName }),
      ...(lastName && { family_name: lastName }),
    }
    const auth0User = await managementClient.createUser(createUserData)
    const authId = auth0User.user_id

    if (!authId) {
      throw new Error(`authId not returned when creating user ${email}`)
    } else {
      let customerData
      if (!tenant) {
        const slug = slugify(customerName!)
        const response = await ctx.prisma.customer.create({
          data: {
            name: customerName!,
            tenant: slug,
            slug,
            defaultTemplate: template as TemplateFlavor,
            mappings: {
              create: [
                {
                  flavor: template as TemplateFlavor,
                  layers: (getFlavorById(template as TemplateFlavor) as Flavor)
                    .layers as unknown as Prisma.InputJsonValue,
                },
              ],
            },
          },
        })

        customerData = response
      } else {
        const response = await ctx.prisma.customer.findFirst({
          where: { tenant },
        })
        if (!response) {
          throw new Error(`Customer tenant is invalid`)
        }
        customerData = response
      }
      const orderData = await ctx.prisma.order.create({
        data: {
          customerTenant: customerData?.tenant!,
          name: jobTitle,
        },
      })
      const avatars = await ctx.prisma.asset.findMany({
        where: { folderId: 233 },
      })
      const randomIndex = Math.floor(Math.random() * avatars.length)
      const userData = await ctx.prisma.user.create({
        data: {
          email: email.toLowerCase(),
          authId,
          firstName,
          lastName,
          avatar: avatars[randomIndex].url,
          hasFreeRequest: true,
          freeRequest: {
            create: {
              jobTitle,
              url: jobURL,
              customerTenant: customerData?.tenant!,
              status: RequestStatus.submitted,
              orderId: orderData.id,
              template: template as TemplateFlavor,
            },
          },
          isApproved: customerData?.isPaid ? false : true,
          customers: {
            connect: {
              tenant: customerData?.tenant!,
            },
          },
        },
        include: {
          customers: true,
          freeRequest: true,
        },
      })

      await ctx.prisma.request.update({
        where: { id: userData.freeRequest?.id },
        data: {
          submittedById: userData.id,
        },
      })
      notifyProductionNewRequest(ctx, userData.freeRequestId!).then(
        async (slackRes) => {
          await ctx.prisma.request.update({
            where: { id: userData.freeRequestId! },
            data: { slackTs: slackRes.ts },
          })
        },
      )
      await managementClient.updateUser(
        { id: authId },
        {
          app_metadata: {
            tenants: {
              [customerData?.tenant!]: {
                role: userData.customers[0].isPaid
                  ? PermissionsRole.User
                  : PermissionsRole.Admin,
              },
            },
          },
        },
      )
      const loginResponse = await loginUser(email, password)
      if (loginResponse.error) {
        throw new AuthenticationError(loginResponse.error_description)
      }
      const { decodedToken, exp } = decodeToken(loginResponse.id_token)
      return {
        accessToken: loginResponse.access_token,
        idToken: loginResponse.id_token,
        expiresIn: loginResponse.expires_in,
        expiresAt: exp,
        decodedToken,
        tenant: customerData?.tenant!,
      }
    }
  } catch (e: any) {
    if (e.statusCode === 409) {
      console.error(`User with email ${email} already exists`)
      throw new Error(
        `Could user with ${email} already exists in Auth0.  Ask an engineer to fix!`,
      )
    }
    throw e
  }
}

export const updateUserPermissions: FieldResolver<
  'Mutation',
  'updateUserPermissions'
> = async (root, args, ctx, info) => {
  const { authId, customerTenant, role, isApproved, hasFreeRequest } = args
  if (!isMe(ctx, authId) && !isLuminaAdmin(ctx)) {
    throw new ForbiddenError('You must only access your own information.')
  }
  const auth0User = await managementClient.getUser({ id: authId })

  const existingTenants: Tenants = auth0User.app_metadata?.tenants!

  let customerUpdateArg
  let updateTenants: Tenants | null = null

  // adding permissions
  if (role?.length! > 0) {
    customerUpdateArg = { connect: { tenant: customerTenant } }
    const newTenant: Tenants = {
      [customerTenant]: { role: role as PermissionsRole[] },
    }
    updateTenants = {
      ...existingTenants,
      ...newTenant,
    }
  }
  // removing permissions
  if (!role || role.length == 0) {
    customerUpdateArg = { disconnect: { tenant: customerTenant } }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [customerTenant]: omitted, ...rest } = {
      ...existingTenants,
    }
    updateTenants = rest
  }
  if (!updateTenants) {
    throw new ApolloError('tenants were not updated, check with techsupport!')
  }
  const prisma = new PrismaClient()
  const avatars = await prisma.asset.findMany({ where: { folderId: 233 } })
  const randomIndex = Math.floor(Math.random() * avatars.length)

  try {
    const data: Record<string, any> = {
      customers: customerUpdateArg,
      avatar: { set: avatars[randomIndex].url },
    }
    if (typeof isApproved === 'boolean') {
      data.isApproved = isApproved
    }
    if (typeof hasFreeRequest === 'boolean') {
      data.hasFreeRequest = hasFreeRequest
    }

    const [user] = await Promise.all([
      ctx.prisma.user.update({
        where: { authId: authId },
        data,
      }),
      managementClient.updateUser(
        { id: authId },
        {
          app_metadata: { tenants: updateTenants },
        },
      ),
    ])

    if (typeof isApproved === 'boolean' && !isApproved) {
      await notifyUserApproval({ userId: user.id })
    }
    return user
  } catch (e: any) {
    throw new ApolloError(e)
  }
}

export const login: FieldResolver<'Mutation', 'login'> = async (
  root,
  args,
  ctx,
  info,
) => {
  const { email, password } = args
  const loginResponse = await loginUser(email, password)
  if (loginResponse.error) {
    throw new AuthenticationError(loginResponse.error_description)
  }

  const { decodedToken, exp } = decodeToken(loginResponse.id_token)
  return {
    accessToken: loginResponse.access_token,
    idToken: loginResponse.id_token,
    expiresIn: loginResponse.expires_in,
    expiresAt: exp,
    decodedToken,
  }
}

export const forgotPasswordResolver: FieldResolver<
  'Mutation',
  'forgotPassword'
> = async (root, args, ctx, info) => {
  const { email } = args
  const res = await forgotPassword(email)
  return {
    message: res,
  }
}

export const deleteOneUser: CustomFieldResolver<
  'Mutation',
  'deleteOneUser'
> = async (root, args, ctx, info, originalResolve) => {
  // const { authId, customerTenant, role } = args
  try {
    await ctx.prisma.loginHistory.deleteMany({
      where: { user: args.where as Prisma.UserWhereInput },
    })
    const res = await originalResolve(root, args, ctx, info)
    if (res?.authId) {
      await managementClient.deleteUser({ id: res.authId })
    }
    return res
  } catch (e: any) {
    throw new ApolloError(e)
  }
}

export const sendOnBoardingEmail: FieldResolver<
  'Mutation',
  'sendOnBoardingEmail'
> = async (_root, args, ctx, _info) => {
  const { authId } = args
  try {
    const auth0Res = await managementClient.createPasswordChangeTicket({
      mark_email_as_verified: true,
      user_id: authId,
      result_url: 'https://app.lumina.co',
      includeEmailInRedirect: true,
      ttl_sec: 1209600,
    })
    // used to display correct password reset form
    const onboardingLink = auth0Res.ticket + 'firstLogin=true'

    const now = new Date()
    const updateData: Onboarding = {
      onboarding: {
        welcomeEmailSent: now.toString(),
      },
    }
    const res = await ctx.prisma.user.findUnique({ where: { authId } })
    const { email, firstName } = res!

    await sndOnBoardingEmail({
      email,
      firstName: firstName || '',
      onboardingLink,
    })
    const updateRes = await ctx.prisma.user.update({
      where: { authId },
      data: updateData,
    })
    if (!res) {
      throw new ApolloError(
        `User with with authId ${authId} not found in our database!`,
      )
    }
    return updateRes
  } catch (e: any) {
    throw e
  }
}
export const sendTeammateInvitations: FieldResolver<
  'Mutation',
  'sendTeammateInvitations'
> = async (_root, args, ctx, _info) => {
  const { customer, emails, authId, type } = args
  try {
    const res = await ctx.prisma.user.findUnique({ where: { authId } })
    if (emails && res?.firstName) {
      await sndTeammateInvitations(
        emails,
        res?.firstName[0].toUpperCase() + res?.firstName.slice(1).toLowerCase(),
        customer,
        res.email,
        type,
      )
    }
    if (!res) {
      throw new ApolloError(
        `User with with authId ${authId} not found in our database!`,
      )
    }
    return res
  } catch (e: any) {
    throw e
  }
}

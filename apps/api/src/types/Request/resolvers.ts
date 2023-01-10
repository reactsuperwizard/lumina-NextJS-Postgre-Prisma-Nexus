import { NexusGenInputs } from '../../../generated/nexusTypes'
import { RequestLogsEvent, RequestStatus } from '@prisma/client'
import type { Request, Prisma } from '@prisma/client'
import { FieldResolver } from 'nexus'
import { CustomFieldResolver } from 'nexus-plugin-prisma/typegen'
import {
  createOneCustomerResource,
  updateOneCustomerResource,
} from '../../auth'

import {
  notifyProductionNewAdminRequest,
  notifyProductionNewRequest,
  notifyProductionRequestStatusChange,
} from './slackIntegration'
import {
  REQUEST_BASE_PRICE,
  REQUEST_BONUS_PRICE,
  REQUEST_BONUS_DEADLINE,
} from './constants'
import { ApolloError } from 'apollo-server-lambda'
import { getFlavorById } from '../Flavor/resolvers'
import { E1 } from '@lumina/render'
import { Flavor } from '@lumina/render/dist/src/flavors'

export const totalRequests: FieldResolver<'Query', 'totalRequests'> = async (
  _root,
  args,
  ctx,
) => {
  const whereArg = args.where
  const count = await ctx.prisma.request.count({
    where: whereArg as Prisma.RequestWhereInput,
  })
  return { count }
}

const hydrateRequestStatus = (
  data: NexusGenInputs['RequestUpdateInput'],
): NexusGenInputs['RequestUpdateInput'] => {
  const newStatusName = data.status?.set
  const protectedStatusName =
    newStatusName === RequestStatus.cancelled ||
    newStatusName === RequestStatus.completed ||
    newStatusName === RequestStatus.submitted
      ? newStatusName
      : null
  if (!protectedStatusName) return data
  const statusUpdatedAt = `${protectedStatusName}At`
  const newData = { ...data, [statusUpdatedAt]: { set: new Date() } }
  return newData
}

export const updateOneRequest: CustomFieldResolver<
  'Mutation',
  'updateOneRequest'
> = async (root, args, ctx, info, originalResolve) => {
  const { data } = args
  // if status is updated, also update the updateAt status for resource
  // e.g. if "status" is set to "completed", "completedAt" will be set to the date now
  const newStatusName = data?.status?.set
  const newData = newStatusName ? hydrateRequestStatus(data) : { ...data }
  const newArgs = { ...args, data: newData }

  const res = await originalResolve(root, newArgs, ctx, info)
  if (newStatusName && res?.id) {
    notifyProductionRequestStatusChange(newStatusName, res)
  }
  return res
}

export const updateOneCustomerRequest: CustomFieldResolver<
  'Mutation',
  'updateOneCustomerRequest'
> = async (root, args, ctx, info, originalResolve) => {
  const { data } = args
  // if status is updated, also update the updateAt status for resource
  // e.g. if "status" is set to "completed", "completedAt" will be set to the date now
  const newStatusName = data?.status?.set
  const newData = newStatusName ? hydrateRequestStatus(data) : { ...data }
  const newArgs = { ...args, data: newData }

  const res = await updateOneCustomerResource('request')(
    root,
    newArgs,
    ctx,
    info,
    originalResolve,
  )
  if (newStatusName === RequestStatus.submitted) {
    try {
      const requestId = await res.id
      notifyProductionNewRequest(ctx, requestId)
    } catch (error) {
      throw error
    }
  }
  return res
}

export const createOneRequest: CustomFieldResolver<
  'Mutation',
  'createOneRequest'
> = async (root, args, ctx, info, originalResolve) => {
  try {
    const { data, ...newArgs } = args
    const newData = { ...data }
    if (ctx?.user?.sub) {
      newData.submittedBy = { connect: { authId: ctx.user.sub } }
    }
    const fullArgs = { data: newData, ...newArgs }
    const res = await originalResolve(root, fullArgs, ctx, info)

    try {
      const requestId = await res.id

      notifyProductionNewAdminRequest(ctx, requestId).then(async (slackRes) => {
        await ctx.prisma.request.update({
          where: { id: requestId },
          data: { slackTs: slackRes.ts },
        })
      })
    } catch (error) {
      throw error
    }
    return res
  } catch (e) {
    throw e
  }
}

export const returnRequestToSubmissionQueue: FieldResolver<
  'Mutation',
  'returnRequestToSubmissionQueue'
> = async (root, args, ctx, info) => {
  try {
    const where = args.where as Prisma.RequestWhereUniqueInput
    const request = await ctx.prisma.request.update({
      where,
      include: {
        script: true,
        logs: true,
      },
      data: {
        status: RequestStatus.submitted,
        logs: {
          create: [
            {
              event: RequestLogsEvent.RequestReturnedToQueue,
              user: {
                connect: {
                  authId: ctx.user?.sub,
                },
              },
            },
          ],
        },
      },
    })
    if (request.script) {
      await ctx.prisma.script.update({
        where: {
          id: request.script.id,
        },
        data: {
          producer: {
            disconnect: true,
          },
        },
      })
    }
    return request
  } catch (e) {
    throw e
  }
}

export const acceptRequest: FieldResolver<'Mutation', 'acceptRequest'> = async (
  root,
  args,
  ctx,
  info,
) => {
  try {
    const where = args.where as Prisma.RequestWhereUniqueInput
    const requestData = await ctx.prisma.request.findFirst({ where })
    if (!requestData) {
      throw new ApolloError('Request is not found')
    }

    if (requestData.status != RequestStatus.submitted) {
      throw new ApolloError('Request is not in submitted state')
    }

    if (!requestData.template) {
      throw new ApolloError('No template is attached to the request')
    }

    if (requestData.template == 'E1') {
      throw new ApolloError('E1 template cannot be scripted')
    }

    const request = await ctx.prisma.request.update({
      where,
      include: {
        script: true,
        logs: true,
        order: true,
      },
      data: {
        status: RequestStatus.scripting,
        logs: {
          create: [
            {
              event: RequestLogsEvent.RequestAccepted,
              user: {
                connect: {
                  authId: ctx.user?.sub,
                },
              },
            },
          ],
        },
      },
    })
    const name = `${request.jobTitle} |#| ${new Date().toLocaleString('en-US')}`

    if (request.script?.id) {
      const scriptData = await ctx.prisma.script.update({
        where: {
          id: request.script?.id,
        },
        data: {
          producer: {
            connect: { authId: ctx.user?.sub },
          },
        },
        include: {
          request: true,
        },
      })
      return scriptData
    } else {
      const tempateFlavorData = getFlavorById(request.template!) as Flavor
      const masterTemplateData = await ctx.prisma.masterTemplate.findFirst({
        where: {
          customer: { tenant: requestData.customerTenant },
          flavor: requestData.template,
        },
      })
      const scriptData = await ctx.prisma.script.create({
        data: {
          producer: {
            connect: { authId: ctx.user?.sub },
          },
          name,
          request: { connect: { id: request.id } },
          order: { connect: { id: request.order?.id } },
          customer: { connect: { tenant: request.customerTenant } },
          globals: tempateFlavorData.globals,
          slides: tempateFlavorData.slides,
          layers:
            masterTemplateData?.layers ||
            (tempateFlavorData.layers as unknown as Prisma.InputJsonValue),
          flavor: request.template!,
        },
        include: {
          request: true,
        },
      })
      return scriptData
    }
  } catch (e) {
    throw e
  }
}

export const createOneCustomerRequest: CustomFieldResolver<
  'Mutation',
  'createOneCustomerRequest'
> = async (root, args, ctx, info, originalResolve) => {
  const { data, ...newArgs } = args
  const newData = { ...data }
  if (ctx?.user?.sub) {
    newData.submittedBy = { connect: { authId: ctx.user.sub } }
  }
  newData.basePrice = REQUEST_BASE_PRICE
  newData.bonusPrice = REQUEST_BONUS_PRICE
  newData.bonusDeadline = new Date(
    new Date().getTime() + REQUEST_BONUS_DEADLINE,
  )
  newData.logs = {
    create: [
      {
        event: RequestLogsEvent.RequestSubmitted,
        user: { connect: { authId: ctx.user?.sub } },
      },
    ],
  }

  const fullArgs = { data: newData, ...newArgs }
  const res = await createOneCustomerResource(true)(
    root,
    fullArgs,
    ctx,
    info,
    originalResolve,
  )
  if (res && res.status === RequestStatus.submitted) {
    const requestId = await res.id
    try {
      const requestData = await ctx.prisma.request.findFirst({
        where: {
          id: res.id as number,
        },
        include: {
          customer: true,
        },
      })
      if (
        !requestData?.customer.isPaid &&
        !requestData?.customer.defaultTemplate &&
        data.template
      ) {
        await ctx.prisma.customer.update({
          where: {
            id: requestData?.customer.id!,
          },
          data: {
            defaultTemplate: data.template,
          },
        })
      }
      notifyProductionNewRequest(ctx, requestId).then(async (slackRes) => {
        await ctx.prisma.request.update({
          where: { id: requestId },
          data: { slackTs: slackRes.ts },
        })
      })
    } catch (error) {
      throw error
    }
  }
  return res
}

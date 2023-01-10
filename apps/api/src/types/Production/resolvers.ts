import { FieldResolver } from 'nexus'
import {
  RenderStatus,
  RequestStatus,
  VideoStatus,
  OrderStatus,
  RequestLogsEvent,
} from '@prisma/client'
import type { Prisma } from '.prisma/client'
import { ApolloError, ForbiddenError } from 'apollo-server-errors'
import { sendOrderCompleteEmail } from '../User/email'

import {
  notifyDirectNewOwner,
  notifyProductionNewOwner,
  notifyCustomerActivation,
  sendSurveyInfo,
  notifyCustomerScriptEdit,
} from './slackIntegration'
import { isCustomerAdmin, isLuminaAdmin } from '../../auth'

export const changeRequestOwner: FieldResolver<
  'Mutation',
  'changeRequestOwner'
> = async (_root, args, ctx, _info) => {
  const whereUser = args.whereUser as Prisma.UserWhereUniqueInput | null
  const whereRequest = args.whereRequest as Prisma.RequestWhereUniqueInput
  const request = await ctx.prisma.request.update({
    where: whereRequest,
    include: {
      owner: true,
    },
    data: {
      owner: whereUser
        ? {
            connect: whereUser,
          }
        : { disconnect: true },
    },
  })
  try {
    const user = request.owner
    if (user) {
      await notifyDirectNewOwner(user, request)
    }
    await notifyProductionNewOwner(user, request)
  } catch (e) {
    console.error(e)
  }
  return request
}

export const publishVideo: FieldResolver<'Mutation', 'publishVideo'> = async (
  _root,
  args,
  ctx,
) => {
  const { id, live } = args
  const oldVideo = await ctx.prisma.video.findUnique({ where: { id } })
  const oldPublishedAt = oldVideo?.publishedAt
  const video = await ctx.prisma.video.update({
    where: { id },
    data: {
      status: { set: live ? VideoStatus.live : VideoStatus.pending },
      ...(live && !oldPublishedAt ? { publishedAt: { set: new Date() } } : {}),
    },
  })
  try {
    const requestData: Prisma.RequestUpdateInput = {
      status: { set: live ? RequestStatus.completed : RequestStatus.qa },
      completedAt: { set: live ? new Date() : null },
    }
    if (!video?.requestId) throw new Error('No requestId')
    const request = await ctx.prisma.request.update({
      where: { id: video.requestId },
      data: requestData,
    })
    if (!request?.orderId) throw new Error('No orderId')
    const incompleteRequests = await ctx.prisma.request.findMany({
      where: {
        orderId: request.orderId,
        status: { notIn: [RequestStatus.completed, RequestStatus.cancelled] },
      },
    })
    const done = !incompleteRequests || incompleteRequests.length < 1
    if (done) {
      const allRequest = await ctx.prisma.request.findMany({
        where: {
          orderId: request.orderId,
        },
      })
      const subIds = allRequest
        .map((r) => r.submittedById || 0)
        .filter((i) => i !== 0)

      const allUsers = await ctx.prisma.user.findMany({
        where: {
          id: { in: subIds },
        },
      })
      const listOfUsers = allUsers.filter((u) => !u.optOut).map((u) => u.email)
      const emailOrderLink = `app.lumina.co/${request.customerTenant}/orders/${request.orderId}`
      if (listOfUsers.length > 0)
        sendOrderCompleteEmail(listOfUsers, emailOrderLink)

      await ctx.prisma.order.update({
        where: { id: request.orderId },
        data: { status: { set: OrderStatus.completed } },
      })
    }
  } catch (e) {
    throw new ApolloError(`publishVideo update failed with error: ${e}`)
  }
  if (!video) {
    throw new ApolloError(
      `Video with with id #${id} not found in our database!`,
    )
  }
  return video
}

export const createScript: FieldResolver<'Mutation', 'createScript'> = async (
  _root,
  args,
  ctx,
  _info,
) => {
  try {
    const data = args.data as Prisma.ScriptCreateInput
    const { request } = data
    const requestId = request?.connect?.id
    if (requestId) {
      await ctx.prisma.request.update({
        where: { id: requestId },
        data: {
          status: { set: RequestStatus.scripting },
          inProgressAt: { set: new Date() },
        },
      })
    }
    const script = await ctx.prisma.script.create({ data })
    if (!script) {
      throw new ApolloError('Script creation unsuccessful.')
    }
    return script
  } catch (e) {
    throw e
  }
}

export const createVideo: FieldResolver<'Mutation', 'createVideo'> = async (
  _root,
  args,
  ctx,
  _info,
) => {
  try {
    const { data } = args
    const { script } = data
    const newData = { ...data }
    if (script?.connect?.id && (!data.name || !data.request)) {
      const scriptData = await ctx.prisma.script.findUnique({
        where: { id: script.connect.id },
      })
      if (scriptData?.name && !data.name) {
        newData.name = scriptData.name.split('|#|')[0]
      }
      if (scriptData?.requestId && !data.request) {
        newData.request = { connect: { id: scriptData.requestId } }
        const request = await ctx.prisma.request.update({
          where: { id: scriptData.requestId },
          data: { status: { set: RequestStatus.qa } },
        })
        if (request?.url) newData.jobUrl = request.url
      }
    }
    const video = await ctx.prisma.video.create({
      data: newData as Prisma.VideoCreateInput,
    })
    if (!video) {
      throw new ApolloError('Video creation unsuccessful.')
    }
    return video
  } catch (e) {
    throw e
  }
}

export const createRender: FieldResolver<'Mutation', 'createRender'> = async (
  _root,
  args,
  ctx,
  _info,
) => {
  const data = args.data as Prisma.RenderCreateInput
  const render = await ctx.prisma.render.create({ data })
  try {
    const { data } = args
    const { script } = data
    if (script?.connect?.id) {
      const scriptData = await ctx.prisma.script.findUnique({
        where: { id: script.connect.id },
      })
      if (scriptData?.requestId) {
        await ctx.prisma.request.update({
          where: { id: scriptData.requestId },
          data: {
            status: { set: RequestStatus.queued },
            logs: {
              create: [
                {
                  event: RequestLogsEvent.ScriptAddedToRenderQueue,
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
      }
    }
    return await render
  } catch (e) {
    throw e
  }
}

export const updateRender: FieldResolver<'Mutation', 'updateRender'> = async (
  _root,
  args,
  ctx,
  _info,
) => {
  const where = args.where as Prisma.RenderWhereUniqueInput
  const data = args.data as Prisma.RenderUpdateInput
  const render = await ctx.prisma.render.update({ where, data })
  try {
    const { data } = args
    const { status } = data
    if (status && render?.scriptId) {
      let requestStatus: RequestStatus | null = null
      const newRenderStatus = status.set
      if (newRenderStatus === RenderStatus.errored)
        requestStatus = RequestStatus.scripting
      if (newRenderStatus === RenderStatus.rendering)
        requestStatus = RequestStatus.rendering
      if (newRenderStatus === RenderStatus.completed)
        requestStatus = RequestStatus.qa
      if (requestStatus) {
        const scriptId = render.scriptId
        const script = await ctx.prisma.script.findUnique({
          where: { id: scriptId },
        })
        if (script)
          await ctx.prisma.request.update({
            where: { id: script.requestId },
            data: { status: { set: requestStatus } },
          })
      }
    }
    return render
  } catch (e) {
    throw e
  }
}

export const updateUrl: FieldResolver<'Mutation', 'updateUrl'> = async (
  _root,
  args,
  ctx,
  _info,
) => {
  const data = args.data as Prisma.RequestUpdateInput
  const where = args.where as Prisma.RequestWhereUniqueInput
  const res = await ctx.prisma.request.update({ where, data })
  if (data.url) {
    const video = await ctx.prisma.video.findUnique({
      where: { requestId: res.id },
    })
    if (video) {
      await ctx.prisma.video.update({
        where: { id: video.id },
        data: { jobUrl: data.url },
      })
    }
  }
  return res
}

export const activateCustomer: FieldResolver<
  'Mutation',
  'activateCustomer'
> = async (_root, args, ctx, _info) => {
  try {
    const where = args.where as Prisma.CustomerWhereUniqueInput
    const res = await ctx.prisma.customer.findUnique({
      where,
    })
    if (res) {
      if ((await isCustomerAdmin(ctx, res.tenant)) || isLuminaAdmin(ctx)) {
        const customer = await ctx.prisma.customer.update({
          where,
          data: { active: { set: true } },
        })
        await notifyCustomerActivation({ customerId: customer.id })
        return customer
      }
    }
    throw new ForbiddenError(`forbidden.`)
  } catch (e) {
    throw e
  }
}

export const sendSurveyData: FieldResolver<
  'Mutation',
  'sendSurveyData'
> = async (_root, args, ctx, _info) => {
  try {
    const where = args.where as Prisma.CustomerWhereUniqueInput
    const { brandReflection, compelling, attractTalent, comments } = args
    const res = await ctx.prisma.customer.findUnique({
      where,
    })
    if (res) {
      await sendSurveyInfo({
        customerName: res.name,
        brandReflection,
        compelling,
        attractTalent,
        comments,
      })
      return res
    }
    throw new ForbiddenError(`forbidden.`)
  } catch (e) {
    throw e
  }
}
export const customerScriptEdit: FieldResolver<
  'Mutation',
  'customerScriptEdit'
> = async (_root, args, ctx, _info) => {
  try {
    const where = args.where as Prisma.ScriptWhereUniqueInput
    const { userId, customerId } = args
    const res = await ctx.prisma.script.findUnique({
      where,
    })
    if (res) {
      await notifyCustomerScriptEdit({ userId, customerId, scriptId: res.id })
      return res
    }
    throw new ForbiddenError(`forbidden.`)
  } catch (e) {
    throw e
  }
}

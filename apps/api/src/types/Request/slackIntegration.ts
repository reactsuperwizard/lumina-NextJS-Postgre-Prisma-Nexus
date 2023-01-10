import { Request, RequestStatus } from '.prisma/client'
import {
  ChatPostMessageArguments,
  ChatPostMessageResponse,
} from '@slack/web-api'
import Slack from '../../slack'

import type { Context } from '../../Context'

export const notifyProductionNewRequest = async (
  ctx: Context,
  requestId: number,
): Promise<ChatPostMessageResponse> => {
  // Post a message to the channel, and await the result.
  // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage

  const request = await ctx.prisma.request.findUnique({
    where: { id: requestId },
    select: {
      createdAt: true,
      customer: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  })

  const requestLink = `https://app.lumina.co/admin/requests/${requestId}`

  const customer = request?.customer

  const { name: customerName, id: customerId } = customer || {}

  const customerLink = `https://app.lumina.co/admin/customers/${customerId}`

  const message: ChatPostMessageArguments = {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Hey Team!* \nLola here. Great news.\n*You've got a New request!*\n*<${requestLink}|Request ${requestId}>*`,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Customer:*\n<${customerLink}|${customerName}>`,
          },
          {
            type: 'mrkdwn',
            text: `*When:*\n${request?.createdAt?.toDateString()}`,
          },
        ],
      },
    ],
    text: 'New Request!',
    channel: Slack.channelId,
  }
  try {
    const res = await Slack.client.chat.postMessage(message)
    return res
  } catch (e) {
    throw e
  }
}

export const notifyProductionNewAdminRequest = async (
  ctx: Context,
  requestId: number,
): Promise<ChatPostMessageResponse> => {
  // Post a message to the channel, and await the result.
  // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage

  const request = await ctx.prisma.request.findUnique({
    where: { id: requestId },
  })
  const requestLink = `https://app.lumina.co/admin/requests/${requestId}`
  const customerTenant = request?.customerTenant
  const customer = await ctx.prisma.customer.findUnique({
    where: { tenant: customerTenant },
  })

  const customerName = customer?.name
  const customerId = customer?.id

  const customerLink = `https://app.lumina.co/admin/customers/${customerId}`

  const message: ChatPostMessageArguments = {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Hey Team!* \nLola here. Great news.\n*A New Request was created from the Admin Panel!!*\n*<${requestLink}|Request ${requestId}>*`,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Customer:*\n<${customerLink}|${customerName}>`,
          },
          {
            type: 'mrkdwn',
            text: `*When:*\n${request?.createdAt?.toDateString()}`,
          },
        ],
      },
    ],
    text: 'New Request from the Admin Panel!',
    channel: Slack.channelId,
  }
  try {
    const res = await Slack.client.chat.postMessage(message)
    return res
  } catch (e) {
    throw e
  }
}

export const notifyProductionRequestStatusChange = async (
  status: RequestStatus,
  request: Request,
): Promise<void> => {
  console.log(request.slackTs)
  const message: ChatPostMessageArguments = {
    text: 'Request Status Changed!',
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Request Status Change',
          emoji: true,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Request <https://app.lumina.co/admin/production?request=${request.id}|${request.id}'s> status changed to *${status}!*`,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Love,\n:heart: Lola :heart:',
        },
      },
    ],
    channel: Slack.channelId,
    // eslint-disable-next-line @typescript-eslint/camelcase
    thread_ts: request?.slackTs || undefined,
  }
  Slack.client.chat.postMessage(message)
}

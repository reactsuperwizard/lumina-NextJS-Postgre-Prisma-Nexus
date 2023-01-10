import type { Request, User } from '@prisma/client'

import Slack from '../../slack'
import type { ChatPostMessageArguments } from '@slack/web-api'

export const notifyDirectNewOwner = async (
  user: User,
  request: Request,
): Promise<void> => {
  if (!user?.slackId) {
    return console.info(
      `user: ${user?.email} does not have a slackId associated with them.  They won't receive notifications via slack.`,
    )
  }
  const message: ChatPostMessageArguments = {
    text: 'New Request Owner!',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Hey ${user.firstName}! Request <https://app.lumina.co/admin/production?request=${request.id}|${request.id}> assigned to you!`,
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
    channel: user?.slackId,
  }
  await Slack.client.chat.postMessage(message)
}

export const notifyProductionNewOwner = async (
  user: User | null,
  request: Request,
): Promise<void> => {
  let text
  if (user) {
    text = `Request <https://app.lumina.co/admin/production?request=${request.id}|${request.id}> assigned to <https://app.lumina.co/admin/users/${user?.id}|${user?.firstName}>!`
  } else {
    text = `Request <https://app.lumina.co/admin/production?request=${request.id}|${request.id}> was unassigned!`
  }
  const message: ChatPostMessageArguments = {
    text: 'New Request Owner!',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text,
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
    thread_ts: request.slackTs || undefined,
  }
  await Slack.client.chat.postMessage(message)
}

interface CustomerActivationProps {
  customerId: number
}

export const notifyCustomerActivation = async ({
  customerId,
}: CustomerActivationProps): Promise<void> => {
  const productionChannelId = process.env.SLACK_CHANNEL_ID

  if (!productionChannelId) {
    throw new Error(
      'SLACK_CHANNEL_ID must be provided as an environment variable.',
    )
  }
  const message: ChatPostMessageArguments = {
    text: 'New Customer Activation!',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Customer <https://app.lumina.co/admin/customers/${customerId}> has committed to be billed and activated their portal!`,
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
    channel: productionChannelId,
  }
  await Slack.client.chat.postMessage(message)
}
interface CustomerScriptEditProps {
  userId: number
  scriptId: number
  customerId: number
}

export const notifyCustomerScriptEdit = async ({
  userId,
  scriptId,
  customerId,
}: CustomerScriptEditProps): Promise<void> => {
  const productionChannelId = process.env.SLACK_CHANNEL_ID

  if (!productionChannelId) {
    throw new Error(
      'SLACK_CHANNEL_ID must be provided as an environment variable.',
    )
  }
  const message: ChatPostMessageArguments = {
    text: 'A user edited a script!',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `User <https://app.lumina.co/admin/users/${userId}> has requested edits to script <https://app.lumina.co/admin/scripts/${scriptId}>!`,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Customer: <https://app.lumina.co/admin/customers/${customerId}>`,
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
    channel: productionChannelId,
  }
  await Slack.client.chat.postMessage(message)
}

interface RatingProps {
  userId: number
  videoId: number
  customerId: number
  rating: number
}

export const notifyRating = async ({
  userId,
  videoId,
  customerId,
  rating,
}: RatingProps): Promise<void> => {
  const productionChannelId = process.env.PLG_SLACK_CHANNEL_ID
  console.log({ productionChannelId })
  if (!productionChannelId) {
    throw new Error(
      'SLACK_CHANNEL_ID must be provided as an environment variable.',
    )
  }
  const message: ChatPostMessageArguments = {
    text: 'A user rated a video!',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `User <https://app.lumina.co/admin/users/${userId}> has rated ${rating} for video <https://app.lumina.co/admin/videos/${videoId}>!`,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Customer: <https://app.lumina.co/admin/customers/${customerId}>`,
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
    channel: productionChannelId,
  }
  await Slack.client.chat.postMessage(message)
}

interface TemplateUnlockProps {
  userId: number
  customerId: number
}

export const notifyTemplateUnlock = async ({
  userId,
  customerId,
}: TemplateUnlockProps): Promise<void> => {
  const productionChannelId = process.env.PLG_SLACK_CHANNEL_ID

  if (!productionChannelId) {
    throw new Error(
      'SLACK_CHANNEL_ID must be provided as an environment variable.',
    )
  }
  const message: ChatPostMessageArguments = {
    text: 'A user has requested to unlock a template!',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `User <https://app.lumina.co/admin/users/${userId}> has requested to unlock templates.`,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Customer: <https://app.lumina.co/admin/customers/${customerId}>`,
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
    channel: productionChannelId,
  }
  await Slack.client.chat.postMessage(message)
}
interface NewUserSignsUp {
  userId: number
}

export const newUserSignsUp = async ({
  userId,
}: NewUserSignsUp): Promise<void> => {
  // const productionChannelId = process.env.PLG_SLACK_CHANNEL_ID

  // if (!productionChannelId) {
  //   throw new Error(
  //     'SLACK_CHANNEL_ID must be provided as an environment variable.',
  //   )
  // }
  const message: ChatPostMessageArguments = {
    text: 'A new user has signed up!',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `<@U029Z4AK821> - User <https://app.lumina.co/admin/users/${userId}> has signed up to Lumina.`,
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
    channel: '#plg-notification',
  }
  await Slack.client.chat.postMessage(message)
}
interface UserApprovalProps {
  userId: number
}

export const notifyUserApproval = async ({
  userId,
}: UserApprovalProps): Promise<void> => {
  const productionChannelId = process.env.PLG_SLACK_CHANNEL_ID

  if (!productionChannelId) {
    throw new Error(
      'SLACK_CHANNEL_ID must be provided as an environment variable.',
    )
  }
  const message: ChatPostMessageArguments = {
    text: 'A user has requested approval to access the portal!',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `User <https://app.lumina.co/admin/users/${userId}> has requested access to portal.`,
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
    channel: productionChannelId,
  }
  await Slack.client.chat.postMessage(message)
}

interface SurveyInfoProps {
  brandReflection: string
  compelling: string
  attractTalent: string
  comments: string
  customerName: string
}

export const sendSurveyInfo = async ({
  brandReflection,
  compelling,
  attractTalent,
  comments,
  customerName,
}: SurveyInfoProps): Promise<void> => {
  const message: ChatPostMessageArguments = {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Hey Team!* \n*${customerName}* has submitted the survey!`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Question 1: Did the video accurately reflect your brand? - *${brandReflection}*`,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Question 2: Is the video job posting more compelling than the original text-only version? - *${compelling}*`,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Question 4: Do you feel confident in your team’s ability to leverage this type of video to attract talent? - *${attractTalent}*`,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Comments / Questions: *${comments}*`,
        },
      },
    ],
    text: 'New Survey Response!',
    channel: '#test-survey',
  }
  await Slack.client.chat.postMessage(message)
}

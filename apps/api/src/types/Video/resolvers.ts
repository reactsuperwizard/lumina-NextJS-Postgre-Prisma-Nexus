import { FieldResolver } from 'nexus'
import { CustomFieldResolver } from 'nexus-plugin-prisma/typegen'
import { RequestStatus, VideoStatus } from '.prisma/client'
import type { Prisma } from '.prisma/client'
import { vimeoClient } from './vimeo-client'
import cloudinary from 'cloudinary'
import { isLuminaAdmin } from '../../auth'
import { ForbiddenError } from 'apollo-server-lambda'
import { notifyRating } from '../Production/slackIntegration'

export const totalVideos: FieldResolver<'Query', 'totalVideos'> = async (
  _root,
  args,
  ctx,
) => {
  const whereArg = args.where as Prisma.VideoFindManyArgs['where']
  const count = await ctx.prisma.video.count({ where: whereArg })
  return { count }
}

export const downloads: FieldResolver<'Video', 'downloads'> = async (root) => {
  if (!root.vimeoId) {
    return null
  } else {
    const result = await new Promise((resolve, reject) => {
      vimeoClient.request(
        {
          path: `/videos/${root.vimeoId}`,
          query: {
            fields: 'download.public_name, download.size_short, download.link',
          },
        },
        (error: any, body: any, statusCode: number) => {
          if (error) {
            console.log('error')
            console.log(error)
            reject()
          } else {
            statusCode === 200 && body?.download
              ? resolve(body.download)
              : resolve(null)
          }
        },
      )
    })
    return result || null
  }
}

export const checkReady: FieldResolver<
  'Video',
  'boolean' | 'checkReady'
> = async (root, _, ctx) => {
  if (!root.vimeoId) return false
  if (root.ready) return true
  const result = await new Promise((resolve, reject) => {
    vimeoClient.request(
      {
        path: `/videos/${root.vimeoId}`,
        query: {
          fields: 'upload.status, transcode.status',
        },
      },
      async (error: any, body: any, statusCode: number) => {
        if (error) {
          console.log('error')
          console.log(error)
          reject()
        } else if (
          statusCode === 200 &&
          body?.transcode &&
          body.transcode.status === 'complete'
        ) {
          await ctx.prisma.video.update({
            where: { id: root.id },
            data: { ready: { set: true } },
          })
          resolve(true)
        } else {
          resolve(false)
        }
      },
    )
  })
  return result || false
}

export const createOneVideo: CustomFieldResolver<
  'Mutation',
  'createOneVideo'
> = async (root, args, ctx, info, originalResolve) => {
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
    return await originalResolve(root, { ...args, data: newData }, ctx, info)
  } catch (e) {
    throw e
  }
}

export const updateOneVideo: CustomFieldResolver<
  'Mutation',
  'updateOneVideo'
> = async (root, args, ctx, info, originalResolve) => {
  const { data } = args
  const { status } = data
  if (data.rating?.set) {
    const requestData = await ctx.prisma.request.findFirst({
      where: { video: { id: args.where.id! } },
      include: {
        submittedBy: true,
        customer: true,
      },
    })

    if (requestData?.submittedBy?.authId == ctx.user?.sub) {
      const video = await ctx.prisma.video.update({
        where: { id: args.where.id! },
        data: { rating: data.rating.set },
      })
      await notifyRating({
        userId: requestData?.submittedBy?.id!,
        videoId: args.where.id!,
        rating: data.rating?.set,
        customerId: requestData?.customer.id!,
      })
      return video
    } else {
      throw new ForbiddenError(`Forbidden.`)
    }
  }

  if (!isLuminaAdmin) throw new ForbiddenError(`Forbidden.`)
  const video = await originalResolve(root, args, ctx, info)
  try {
    if (status) {
      const settingLive = status.set === VideoStatus.live
      const requestStatus = settingLive
        ? RequestStatus.completed
        : RequestStatus.qa
      const requestData: Prisma.RequestUpdateInput = {
        status: { set: requestStatus },
        completedAt: { set: settingLive ? new Date() : null },
      }
      if (video?.requestId) {
        await ctx.prisma.request.update({
          where: { id: video.requestId },
          data: requestData,
        })
      }
      if (settingLive && video)
        await ctx.prisma.video.update({
          where: { id: video.id },
          data: { publishedAt: { set: new Date() } },
        })
    }
    return video
  } catch (e) {
    throw e
  }
}

export const thumbnail: FieldResolver<'Video', 'thumbnail'> = async (
  root,
  _args,
  ctx,
) => {
  let newUrl: string | null = null
  if (root.thumbnail) return root.thumbnail
  if (!root.vimeoId || !root.ready) return null
  console.log('fetching thumbnail from Vimeo')
  try {
    const vimeoUrl: null | string = await new Promise((resolve, reject) => {
      vimeoClient.request(
        {
          path: `/videos/${root.vimeoId}`,
          query: {
            fields: 'pictures',
          },
        },
        // eslint-disable-next-line @typescript-eslint/camelcase
        (error: any, body: any, status_code: number) => {
          if (error) {
            console.log('error')
            console.log(error)
            reject()
          } else {
            const thumbnail = body.pictures.sizes.find(
              (thumbnail: { width: number }) => thumbnail.width === 640,
            )
            // eslint-disable-next-line @typescript-eslint/camelcase
            status_code === 200 && thumbnail
              ? resolve(thumbnail.link)
              : resolve(null)
          }
        },
      )
    })
    if (vimeoUrl && process.env.CLOUDINARY_API_SECRET) {
      const uploadSignature = cloudinary.v2.utils.api_sign_request(
        {
          source: vimeoUrl,
          upload_preset: 'jla39qxv',
        },
        process.env.CLOUDINARY_API_SECRET,
      )
      await cloudinary.v2.uploader
        .upload(vimeoUrl, {
          cloud_name: 'hdngr',
          api_key: 544831596869866,
          upload_preset: 'jla39qxv',
          upload_signature: uploadSignature,
          api_secret: process.env.CLOUDINARY_API_SECRET,
          public_id: root.id.toString(),
        })
        .then(async (result) => {
          console.log(`Uploaded Thumbnail for video number ${root.id}`)
          newUrl = result.secure_url
        })
        .catch((error) => {
          console.log(
            `Error video number ${root.id}`,
            JSON.stringify(error, null, 2),
          )
        })
      if (newUrl) {
        const updatedVideo = await ctx.prisma.video.update({
          where: { id: root.id },
          data: { thumbnail: { set: newUrl } },
        })
        newUrl = updatedVideo.thumbnail
        console.log(`stored thumbnail for ${root.name} updated to ${newUrl}`)
      }
    }
    return newUrl
  } catch (e) {
    console.log(`Error: ${e}`)
    console.log(`Unable to load thumbnail for Vimeo video ${root.vimeoId}`)
    return null
  }
}

export const producerId: FieldResolver<'Video', 'producerId'> = async (
  root,
  _args,
  ctx,
) => {
  const script = await ctx.prisma.script.findUnique({
    where: { videoId: root.id },
  })
  return script?.userId || null
}

export const scriptLayers: FieldResolver<'Video', 'scriptLayers'> = async (
  root,
  _args,
  ctx,
) => {
  const script = await ctx.prisma.script.findUnique({
    where: { videoId: root.id },
  })
  return script?.layers
}

export const scriptId: FieldResolver<'Video', 'scriptId'> = async (
  root,
  _args,
  ctx,
) => {
  const script = await ctx.prisma.script.findUnique({
    where: { videoId: root.id },
  })
  return script?.id || null
}
export const scriptIdAndLayers: FieldResolver<
  'Video',
  'scriptIdAndLayers'
> = async (root, _args, ctx) => {
  const script = await ctx.prisma.script.findUnique({
    where: { videoId: root.id },
  })
  const scriptIdAndLayers = {
    scriptId: script?.id,
    scriptLayers: script?.layers,
  }
  return scriptIdAndLayers
}

export const canRevise: FieldResolver<'Video', 'canRevise'> = async (
  root,
  _args,
  ctx,
) => {
  const video = await ctx.prisma.video.findUnique({
    where: { id: root.id },
  })
  const customer = await ctx.prisma.customer.findUnique({
    where: { tenant: video?.customerTenant },
  })
  return customer?.canRevise || null
}

export const customerId: FieldResolver<'Video', 'customerId'> = async (
  root,
  _args,
  ctx,
) => {
  const video = await ctx.prisma.video.findUnique({
    where: { id: root.id },
  })
  const customer = await ctx.prisma.customer.findUnique({
    where: { tenant: video?.customerTenant },
  })
  return customer?.id || null
}

export const updateThumbnail: FieldResolver<
  'Mutation',
  'updateThumbnail'
> = async (_root, args, ctx) => {
  const { id, time } = args
  const video = await ctx.prisma.video.findUnique({
    where: { id },
  })
  const newTime = time || 1.5
  if (!video?.vimeoId) return null
  try {
    vimeoClient.request(
      {
        path: `/videos/${video.vimeoId}/pictures`,
        method: 'POST',
        query: { active: true, time: newTime },
      },
      () =>
        console.log(`Thumbnail has been updated to be at ${newTime} seconds`),
    )
  } catch (error) {
    console.log(error)
  }
  await ctx.prisma.video.update({
    where: { id },
    data: { thumbnail: { set: null } },
  })
  return video
}

export const updateVideoName: FieldResolver<
  'Mutation',
  'updateVideoName'
> = async (_root, args, ctx) => {
  const { data, where } = args
  if (!data || !where || !where.id || !data?.name?.set) return null
  const video = await ctx.prisma.video.update({
    where: { id: where.id },
    data: { name: { set: data.name.set } },
  })
  if (!video?.vimeoId) return video
  try {
    vimeoClient.request(
      {
        path: `/videos/${video.vimeoId}`,
        method: 'PATCH',
        query: { name: data.name.set },
      },
      () => console.log(`Video name has been updated`),
    )
  } catch (error) {
    console.log(error)
  }
  return video
}

import { GraphQLClient } from 'graphql-request'
// const Vimeo = require('vimeo').Vimeo
import { Vimeo } from 'vimeo'

import { IJob } from './types'
import path from 'path'
import { Video, VideoCreateInput, VideoUpdateInput } from '@lumina/api'
import { ScriptQuery } from './Script'

const { VIMEO_CLIENT_ID, VIMEO_CLIENT_SECRET, VIMEO_ACCESS_TOKEN } = process.env

if (!VIMEO_CLIENT_ID || !VIMEO_CLIENT_SECRET || !VIMEO_ACCESS_TOKEN) {
  throw new Error('Check your Vimeo .env variables!')
}

const vimeoClient = new Vimeo(
  VIMEO_CLIENT_ID,
  VIMEO_CLIENT_SECRET,
  VIMEO_ACCESS_TOKEN,
)

export const uploadNewVideo = async (
  client: GraphQLClient,
  job: IJob,
  script: ScriptQuery,
) => {
  // TODO: improve local filename system
  const videoPath = path.join(
    process.env.VIDEOS_DIR_PATH!,
    `job-${job.scriptId}.mp4`,
  )
  console.log('-------VIDEO PATH---------')
  console.log(videoPath)
  const name = script.name?.split('|#|')[0] || `Lumina job-${job.scriptId}`
  const uploadToVimeo = () => {
    return new Promise((resolve, reject) => {
      vimeoClient.upload(
        videoPath,
        {
          name,
          privacy: { view: 'disable', embed: 'public' },
          embed: {
            buttons: {
              embed: false,
              like: false,
              share: false,
              watchlater: false,
            },
            logos: { vimeo: false },
          },
        },
        (uri: any) => {
          console.log(`Video upload complete: ${uri}`)
          resolve(uri)
        },
        (bytesUploaded: number, bytesTotal: number) => {
          const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)
          console.log(bytesUploaded, bytesTotal, percentage + '%')
        },
        (error: any) => {
          console.error(`Video upload error: ${error}`)
          reject(error)
        },
      )
    }).catch((e) => {
      if (e) console.log(e)
      return null
    })
  }

  const moveToFolder = (uri: string) => {
    return new Promise((resolve, reject) => {
      vimeoClient.request(
        {
          method: 'PUT',
          path: `/me/projects/${process.env.VIMEO_QA_PROJECT_ID}${uri}`,
        },
        (error: any, body: any, statusCode: any, headers: any) => {
          if (error) {
            console.log(error, body, statusCode, headers)
            reject(error)
          } else {
            resolve(uri)
          }
        },
      )
    })
  }

  const setVimeoId = async (vimeoId: number) => {

    console.log(`vimeoID to set/assign: ${vimeoId}`)

    const CREATE_VIDEO = `mutation video($data: VideoCreateInput!) {
      createVideo(data: $data) {
        id, vimeoId
      }
    }`
    const data: VideoCreateInput = {
      vimeoId: +vimeoId,
      script: {
        connect: { id: job.scriptId },
      },
      customer: {
        connect: { id: script.request.customer.id },
      },
      order: {
        connect: { id: script.order.id },
      },
    }
    const {
      createVideo: video,
    }: { createVideo: Video } = await client.request(CREATE_VIDEO, { data })
    return video
  }

  console.log('Uploading new video...')

  return await uploadToVimeo().then(async (uri: any) => {
    await moveToFolder(uri)

    const uriParams = uri.split('/')
    return setVimeoId(uriParams[uriParams.length - 1])
  })
}

export const updateVideo = async (
  client: GraphQLClient,
  job: IJob,
  vimeoId: number, // TODO: pull dynamically from current job script
) => {
  const videoPath = path.join(
    process.env.VIDEOS_DIR_PATH!,
    `job-${job.scriptId}.mp4`,
  )

  const UPDATE_ONE_VIDEO = `mutation video($where: VideoWhereUniqueInput!, $data: VideoUpdateInput!) {
    updateOneVideo(where: $where, data: $data) { id }
  }`

  const data: VideoUpdateInput = { ready: { set: false } }

  const updateVimeoVideo = (vimeoId: number) => {
    return new Promise<string>((resolve, reject) => {
      vimeoClient.replace(
        videoPath,
        `/videos/${vimeoId}`,
        {
          file_name: vimeoId,
          'upload.approach': 'streaming',
        },
        async (uri: any) => {
          await client.request(UPDATE_ONE_VIDEO, {
            where: { vimeoId },
            data,
          })
          resolve(`Video update complete: ${uri}`)
        },
        (bytesUploaded: number, bytesTotal: number) => {
          const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)
          console.log(bytesUploaded, bytesTotal, percentage + '%')
        },
        (error: any) => {
          console.error(`Video update error: ${error}`)
          reject(error)
        },
      )
    }).catch((e) => {
      if (e) console.log(e)
      return null
    })
  }

  console.log(`Updating video: ${vimeoId}`)
  console.log(`Expect video at ${videoPath}`)

  return await updateVimeoVideo(vimeoId)
}


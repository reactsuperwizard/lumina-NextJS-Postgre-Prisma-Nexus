/* eslint-disable @typescript-eslint/no-var-requires */

import { getClient } from './client'
import { checkQueue, updateRender } from './queue'
import Script from './Script'
// import { getTemplates } from './templates'
import Job from './Job'
import { renderJob } from './render'
import { uploadNewVideo, updateVideo } from './video'
import { IRenderMap } from './types'
import { RenderStatus } from '@lumina/api'
import {
  foundScripts,
  gettingScripts,
  renderingJob,
  renderingScript,
  publishingVideo,
  scriptComplete,
} from './utils/messages'

//1 check render que for the oldest render
//2 get the corresponding script
//3 assemble job data
//4 render video
//5 push videos to vimeo
//6 ensure cleanup
// restart loop

if (!process.env.VIDEOS_DIR_PATH) {
  throw new Error('make sure to provide the VIDEOS_DIR_PATH env variable.')
}

const seconds = 30
const interval = seconds * 1000

const logNoRenders = () => {
  if (process.env.NODE_ENV === 'production') {
    console.clear()
  }
  const date = new Date()
  console.info(`Renders checked at ${date.toString()}`)
  console.info('No scripts in the que.')
  date.setSeconds(date.getSeconds() + seconds)
  console.info(`Will check again at ${date.toString()}`)
}

const main = async () => {
  const client = await getClient()
  if (!client) throw new Error('could not establish client')

  /**
   * Primary operation function that first checks for a `Render` in the queue.
   * - If found it is passed to `renderProcess`
   * - If not found, prints to log that nothing was found and calls `loop()`
   */
  const run = async () => {
    try {
      const renderMap: IRenderMap | null = await checkQueue(client)
      if (renderMap) {
        renderProcess(renderMap)
      } else {
        logNoRenders()
        loop()
      }
    } catch (error) {
      console.log(error)
      console.log('Error fetching queue...')
      loop()
    }
  }

  /**
   * Delayed start of `run()` using `setTimeout` and constant `interval`
   */
  const loop = async () => {
    await new Promise((resolve) => setTimeout(resolve, interval))
    run()
  }

  /**
   * Primary function to render a video from a found `Render` object in the queue
   *
   * Expects a single object containing the id numbers for the corresponding `Script` & `Render`.
   *
   * #### BEHAVIOR:
   * - Before returning, the function always calls `run()`
   * - The `Render` is updated to `Rendering` in order to prevent multiple instances running the same `Script`
   * - The `Script` is pulled from the DB
   * - A `Job` is created from the `Script`
   * - If `Job` creation fails or the `Script` is not found, the `Render` is set to `Errored` and return is reached
   * - A function to `updateRenderStatus` and overrides passing the "reuse" flag if on Mac are passed with the `Job` to `renderJob`
   * - If rendering fails or video is not found after completion, `Render` is set to `Errored` and return is reached
   * - The newly rendered video is uploaded to Vimeo creating a new or replacing existing based on if the `Script` had been rendered before
   * - Based on success of the upload, Render` is set to `Completed` or `Errored` and return is reached
   *
   *
   * @param renderMap object containing - renderId: number, scriptId: number
   * @returns void
   */
  const renderProcess = async (renderMap: IRenderMap) => {
    const { scriptId, renderId } = renderMap

    const catchError = async (e: string) => {
      console.log(e)
      await updateRender(client, {
        data: {
          status: { set: RenderStatus.Errored },
          error: { set: e },
        },
        where: { id: renderId },
      })
    }

    updateRender(client, {
      where: { id: renderId },
      data: { status: { set: RenderStatus.Rendering } },
    })

    console.info(foundScripts(scriptId))

    console.log(gettingScripts)

    const script = await Script.get(client, scriptId)
    console.log(script)

    const job = script ? await Job.createJob(client, script, renderMap) : null

    // script fetch failed or job failed to create
    if (!job || !script) {
      const message = !script
        ? `Unable to fetch Script #${scriptId} from API`
        : 'Job creation failed'
      console.log(message)
      await catchError(message)
      run()
      return
    }

    console.log(renderingJob)

    console.info(renderingScript(scriptId))

    const updateRenderProgress = (_job: never, progress: string) =>
      updateRender(client, {
        data: { progress: { set: +progress } },
        where: { id: renderId },
      })

    try {
      const overrides =
        process.platform !== 'win32' ? { aeParams: ['reuse'] } : undefined
      await renderJob(job, updateRenderProgress, overrides)
    } catch (e: any) {
      await catchError(e?.message || 'Render error')
      run()
      return
    }
    // }

    const videoPath = process.env.VIDEOS_DIR_PATH
    if (!videoPath) {
      throw new Error(`////// Unable to find video with Id #${scriptId}`)
    }

    // // create Video Resource
    console.log(publishingVideo(job.scriptId))

    const vimeoId = script?.video?.vimeoId || null

    // handle the cases where 1) video already exists in vimeo so we need to update it ("replace" it), OR
    // 2) we are creating a new video in vimeo

    const result = vimeoId
      ? updateVideo(client, job, vimeoId)
      : uploadNewVideo(client, job, script)
    const finishedResult = await result

    if (finishedResult) {
      await updateRender(client, {
        data: { status: { set: RenderStatus.Completed } },
        where: { id: renderId },
      })
      console.log(scriptComplete(scriptId))
    } else {
      catchError(`Failed to ${vimeoId ? 'update' : 'upload'} video`)
      run()
      return
    }

    run()
  }

  run()
}

main()

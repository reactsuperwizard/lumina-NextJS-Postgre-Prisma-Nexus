import path from 'path'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { init, render } = require('@nexrender/core')
import { IJob } from './types'

interface IRenderJob {
  template: any
  assets: any
  actions: {
    postrender: any[]
  }
  onRenderProgress: (_job: never, renderProgress: string) => void
}

interface Settings {
  logger?: any
  debug?: boolean
  skipCleanup?: boolean // default: false
  workpath?: string
  multiFrames?: boolean // false
  stopOnError?: boolean
  maxMemoryPercent?: number // default 50
  imageCachePercent?: number // default 50,
  addLicense?: false // default true
  aeParams?: any // pass an object of aeParams - https://helpx.adobe.com/after-effects/user-guide.html/after-effects/using/automated-rendering-network-rendering.ug.html
  // for example, {aeParams: { close: 'SAVE_CHANGES' }},
}

export const renderJob = async (
  job: IJob,
  onRenderProgress: (_job: never, progress: string) => void,
  overrides?: Settings,
): Promise<void> => {
  const settings = init({
    logger: console,
    debug: true,
    skipCleanup: false, // default: false
    workpath: process.env.VIDEOS_DIR_PATH,
    multiFrames: false, // false
    stopOnError: true,
    maxMemoryPercent: process.env.NODE_ENV === 'production' ? 80 : 50, //
    imageCachePercent: process.env.NODE_ENV === 'production' ? 80 : 50, //,
    addLicense: false, // true
    reuse: false, // reuse AE Render process
    ...overrides,
  })

  const jobWithActions = (job: IJob): IRenderJob => {
    const { scriptId, aeRenderData } = job
    const { template, assets } = aeRenderData
    const actions = {
      postrender: [
        {
          module: '@nexrender/action-encode',
          preset: 'mp4',
          output: `job-${scriptId}.mp4`,
          params: {
            '-r': '30',
          },
        },
        {
          module: '@nexrender/action-copy',
          input: `job-${scriptId}.mp4`,
          output: path.join(
            `${process.env.VIDEOS_DIR_PATH}/job-${scriptId}.mp4`,
          ),
        },
      ],
    }
    return { template, assets, actions, onRenderProgress }
  }

  try {
    const toRender = jobWithActions(job)
    const result = await render(toRender, settings)
    console.log(result)
  } catch (e) {
    console.log(e)
  }
}

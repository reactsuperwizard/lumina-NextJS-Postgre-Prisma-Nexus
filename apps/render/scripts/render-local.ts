import path from 'path'

const dotenvAbsolutePath = path.join(__dirname, '../.env.local')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv').config({ path: dotenvAbsolutePath })
if (dotenv.error) {
  throw dotenv.error
}

import { IJob, IRenderMap } from '../src/types'
import { renderJob } from '../src/render'

import { T1 as T1Job } from '../sample-data/sample-t1-job'
import { T2 as T2Job } from '../sample-data/sample-t2-job'
import { T4 as T4Job } from '../sample-data/sample-t4-job'
import { T6 as T6Job } from '../sample-data/sample-t6-job'
import { T7 as T7Job } from '../sample-data/sample-t7-job'
import { T8 as T8Job } from '../sample-data/sample-t8-job'
import { T10 as T10Job } from '../sample-data/sample-t10-job'
import { T11 as T11Job } from '../sample-data/sample-t11-job'
import { T12 as T12Job } from '../sample-data/sample-t12-job'
import { T13 as T13Job } from '../sample-data/sample-t13-job'
import { T14 as T14Job } from '../sample-data/sample-t14-job'
import { T15 as T15Job } from '../sample-data/sample-t15-job'
import { T16 as T16Job } from '../sample-data/sample-t16-job'
import { T1 as T1Script } from '../sample-data/sample-t1-script'
import { T2 as T2Script } from '../sample-data/sample-t2-script'
import { T4 as T4Script } from '../sample-data/sample-t4-script'
import { T6 as T6Script } from '../sample-data/sample-t6-script'
import { T7 as T7Script } from '../sample-data/sample-t7-script'
import { T8 as T8Script } from '../sample-data/sample-t8-script'
import { T10 as T10Script } from '../sample-data/sample-t10-script'
import { T11 as T11Script } from '../sample-data/sample-t11-script'
import { T12 as T12Script } from '../sample-data/sample-t12-script'
import { T13 as T13Script } from '../sample-data/sample-t13-script'
import { T14 as T14Script } from '../sample-data/sample-t14-script'
import { T15 as T15Script } from '../sample-data/sample-t15-script'
import { T16 as T16Script } from '../sample-data/sample-t16-script'
import yargs from 'yargs'
import Job from '../src/Job'
import { getClient } from '../src/client'
import Script, { ScriptQuery } from '../src/Script'

import psList from 'ps-list'

const argv = yargs
  .scriptName('render-local')
  .usage(
    '$0 [--template=<T1|T2|T4|T6|T7|T8|T10|T11|T12|T13|T14|T15|T16>] [--script] [--job] [--fetch=<script1>]',
  )
  .help('h')
  .alias('h', 'help')
  .options({
    template: {
      type: 'string',
      choices: [
        'T1',
        'T2',
        'T4',
        'T6',
        'T7',
        'T8',
        'T10',
        'T11',
        'T12',
        'T13',
        'T14',
        'T15',
        'T16',
      ],
      alias: 't',
    },
    script: { type: 'boolean', alias: 's' },
    job: { type: 'boolean', alias: 'j' },
    fetch: { type: 'number', alias: 'f' },
  }).argv

const videosDirPath = path.join(__dirname, '../videos')
console.log(videosDirPath)
process.env['VIDEOS_DIR_PATH'] = videosDirPath

const onRenderProgress = (_job: any, progress: string) => {
  console.log(progress)
}

if (argv.template && !argv.script && !argv.job) {
  throw Error(
    'Say whether you want to render from a job, or turn a script into a job and then render that.',
  )
}

if (!argv.template && !argv.script && !argv.job && !argv.fetch) {
  throw Error(
    'If you want to fetch a script to render, you must provide script id',
  )
}

const main = async () => {
  let job: IJob
  let script: ScriptQuery

  const client = await getClient()

  if (argv.fetch) {
    console.log(argv.fetch)
    script = await Script.get(client, argv.fetch as number)
  }

  if (argv.template === 'T1') {
    if (argv.script) {
      script = T1Script as ScriptQuery
    }
    if (argv.job) {
      job = T1Job
    }
  }
  if (argv.template === 'T2') {
    if (argv.script) {
      script = T2Script as ScriptQuery
    }
    if (argv.job) {
      job = T2Job
    }
  }
  if (argv.template === 'T4') {
    if (argv.script) {
      script = T4Script as ScriptQuery
    }
    if (argv.job) {
      job = T4Job
    }
  }
  if (argv.template === 'T6') {
    if (argv.script) {
      script = T6Script
    }
    if (argv.job) {
      job = T6Job
    }
  }
  if (argv.template === 'T7') {
    if (argv.script) {
      script = T7Script
    }
    if (argv.job) {
      job = T7Job
    }
  }
  if (argv.template === 'T8') {
    if (argv.script) {
      script = T8Script
    }
    if (argv.job) {
      job = T8Job
    }
  }
  if (argv.template === 'T10') {
    if (argv.script) {
      script = T10Script
    }
    if (argv.job) {
      job = T10Job
    }
  }
  if (argv.template === 'T11') {
    if (argv.script) {
      script = T11Script
    }
    if (argv.job) {
      job = T11Job
    }
  }
  if (argv.template === 'T12') {
    if (argv.script) {
      script = T12Script
    }
    if (argv.job) {
      job = T12Job
    }
  }
  if (argv.template === 'T13') {
    if (argv.script) {
      script = T13Script
    }
    if (argv.job) {
      job = T13Job
    }
  }
  if (argv.template === 'T14') {
    if (argv.script) {
      script = T14Script
    }
    if (argv.job) {
      job = T14Job
    }
  }
  if (argv.template === 'T15') {
    if (argv.script) {
      script = T15Script
    }
    if (argv.job) {
      job = T15Job
    }
  }
  if (argv.template === 'T16') {
    if (argv.script) {
      script = T16Script
    }
    if (argv.job) {
      job = T16Job
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (script!) {
    const _job = await Job.createJob(client, script, {} as IRenderMap)
    if (_job) job = _job
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (job!) {
    console.log(JSON.stringify(job))
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await renderJob(job!, onRenderProgress, {
      aeParams: ['close SAVE_CHANGES'],
      skipCleanup: true,
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    const processes = await psList()
    processes.forEach((p) => {
      if (p.name === 'aerendercore') {
        console.log(`Killing aerendercore pid: ${p.pid}`)
        process.kill(p.pid)
      }
    })
  })

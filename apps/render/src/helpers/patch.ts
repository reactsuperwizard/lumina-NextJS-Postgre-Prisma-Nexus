import os from 'os'
import fs from 'fs'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import patch = require('@nexrender/core/src/helpers/patch')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import autofind = require('@nexrender/core/src/helpers/autofind')

const settings: any = {}

settings.wsl =
  os.platform() === 'linux' && os.release().match(/microsoft/i) ? true : false

const binaryAuto = autofind(settings)
const binaryUser =
  settings.binary && fs.existsSync(settings.binary) ? settings.binary : null

patch({ logger: console, binary: binaryUser || binaryAuto })

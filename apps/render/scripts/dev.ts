import path from 'path'

const dotenvAbsolutePath = path.join(__dirname, '../.env.local')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv').config({ path: dotenvAbsolutePath })

if (dotenv.error) {
  throw dotenv.error
}

const videosDirPath = path.join(__dirname, '../videos')
console.log(videosDirPath)
process.env['VIDEOS_DIR_PATH'] = videosDirPath

require('../src')

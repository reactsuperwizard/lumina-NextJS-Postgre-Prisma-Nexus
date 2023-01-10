import path from 'path'
import yargs from 'yargs'

const argv = yargs
  .scriptName('render')
  .help('h')
  .alias('h', 'help')
  .options({
    staging: {
      type: 'boolean',
      alias: 's',
      description:
        'Use the staging environment variables and staging api "next".',
    },
    local: {
      type: 'boolean',
      alias: 'l',
      description: 'Use local environment variables and "localhost" for api',
    },
    dev: {
      type: 'boolean',
      alias: 'd',
      description: 'Use the develppment environment variables and "dev" api',
    },
  }).argv

let dotenvAbsolutePath
if (argv.staging) {
  dotenvAbsolutePath = path.join(__dirname, '../.env.staging')
} else if (argv.local) {
  dotenvAbsolutePath = path.join(__dirname, '../.env.local')
} else if (argv.dev) {
  dotenvAbsolutePath = path.join(__dirname, '../.env.dev')
} else {
  dotenvAbsolutePath = path.join(__dirname, '../.env.production')
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv').config({ path: dotenvAbsolutePath })

if (dotenv.error) {
  throw dotenv.error
}

const videosDirPath = path.join(path.dirname(process.execPath), '../videos')
process.env['VIDEOS_DIR_PATH'] = videosDirPath

require('../src')

// require('dotenv').config()

if (process.env.NODE_ENV === 'local') {
  require('source-map-support').install()
}

import * as path from 'path'

import {
  makeSchema,
  fieldAuthorizePlugin,
  declarativeWrappingPlugin,
} from 'nexus'
import { applyMiddleware } from 'graphql-middleware'
import { logTxTime, nexusSchemaPrisma } from './plugins'
import { middleware } from './middleware'

import * as types from './types'
import { ForbiddenError } from 'apollo-server-lambda'
import { GraphQLSchema } from 'graphql'

const shouldGenerateArtifacts = process.env.GEN_ARTIFACTS === 'true'

console.info(`Lumina: should generate artifacts?: ${shouldGenerateArtifacts}`)

const executableSchema = makeSchema({
  types,
  sourceTypes: {
    modules: [
      {
        module: require.resolve('.prisma/client/index.d.ts'),
        alias: 'prisma',
      },
    ],
  },
  shouldGenerateArtifacts, // prevent generating types in production - Lambda is a read-only FS
  plugins: [
    nexusSchemaPrisma(shouldGenerateArtifacts),
    fieldAuthorizePlugin({
      formatError: ({ error }: { error: any }) => new ForbiddenError(error),
    }),
    logTxTime,
    declarativeWrappingPlugin(),
  ],
  contextType: {
    module: path.join(__dirname, './Context'),
    alias: 'ContextModule',
    export: 'Context',
  },
  outputs: {
    schema: path.join(__dirname, '../generated/schema.graphql'),
    typegen: path.join(__dirname, '../generated/nexusTypes.d.ts'),
  },
  prettierConfig: shouldGenerateArtifacts
    ? require.resolve(path.join(__dirname, '../package.json'))
    : undefined,
})

export const schema = applyMiddleware(
  executableSchema as GraphQLSchema,
  ...middleware,
)

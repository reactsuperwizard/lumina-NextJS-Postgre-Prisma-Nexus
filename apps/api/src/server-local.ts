import path from 'path'

const dotenvAbsolutePath = path.join(__dirname, '../.env.development')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv').config({ path: dotenvAbsolutePath })
if (dotenv.error) {
  throw dotenv.error
}

import { ApolloServer } from 'apollo-server-express'
import { graphqlUploadExpress } from 'graphql-upload'

import express from 'express'

import { PrismaClient } from '.prisma/client'

import { schema } from './schema'

import { speak } from './utils'
import Rest from './rest'

// upgrade our console
speak()

process.on('warning', (e) => console.warn(e.stack))

const prisma = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function startServer() {
  const server = new ApolloServer({
    schema,
    logger: console,
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    formatError: (err) => {
      console.error(err.message)
      console.dir(err)
      return err
    },

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    context: ({ req }) => {
      return {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        //@ts-ignore
        headers: req.headers,
        prisma,
      }
    },
  })
  await server.start()

  const app = express()

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress())

  app.use(Rest)

  server.applyMiddleware({ app, path: '/' })

  await new Promise<void>((r) => app.listen({ port: 4000 }, r))

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startServer()

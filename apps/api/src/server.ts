import { ApolloServer } from 'apollo-server-lambda'
import { ApolloServerPluginLandingPageDisabled } from 'apollo-server-core'
import { PrismaClient } from '@prisma/client'

import express from 'express'

import { graphqlUploadExpress } from 'graphql-upload'
import { schema } from './schema'

import { speak } from './utils'
import Rest from './rest'
// upgrade our console
speak()

process.on('warning', (e) => console.warn(e.stack))

const prisma = new PrismaClient()

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
  context: ({ event, context, express }) => {
    const headers = Object.keys(event.headers)
    for (const key of headers) {
      event.headers[key.toLowerCase()] = event.headers[key]
    }
    return {
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
      prisma,
      expressRequest: express.req,
    }
  },
  plugins: [ApolloServerPluginLandingPageDisabled()],
})

const createHandler = server.createHandler({
  expressAppFromMiddleware(middleware) {
    const app = express()
    app.use(graphqlUploadExpress())
    app.use(Rest)
    // This must come last.
    // Configs cascade and default middleware will overwrite custom defined middlewares.
    app.use(middleware)
    return app
  },
})

export const lambda: AWSLambda.Handler = (
  event: AWSLambda.APIGatewayProxyEvent,
  context: AWSLambda.Context,
  cb: AWSLambda.Callback<AWSLambda.APIGatewayProxyResult>,
) => {
  // Set to false to send the response right away when the callback executes, instead of waiting for the Node.js event loop to be empty.
  context.callbackWaitsForEmptyEventLoop = false
  return createHandler(event, context, cb)
}

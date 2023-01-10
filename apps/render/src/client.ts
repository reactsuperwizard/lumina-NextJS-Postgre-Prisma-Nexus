import { getToken } from './auth'
import { GraphQLClient } from 'graphql-request'

export const getClient = async (): Promise<GraphQLClient> => {
  const token = await getToken()
  if (!process.env.MIDAS_API_ENDPOINT) {
    throw new Error("Make sure you've set the MIDAS_API_ENDPOINT env variable")
  }
  return new GraphQLClient(process.env.MIDAS_API_ENDPOINT, {
    headers: {
      Authorization: token,
    },
  })
}

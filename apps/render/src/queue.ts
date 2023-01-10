import { GraphQLClient } from 'graphql-request'

import {
  QueryRendersArgs,
  Render,
  RenderStatus,
  MutationUpdateOneRenderArgs,
} from '@lumina/api'

import { IRenderMap } from './types'

const CHECK_QUE_QUERY = `query renders($where: RenderWhereInput){
  renders(where: $where, take: 1, orderBy: { queuedAt: asc }) {
    id, script { id }
  }
}
`

const UPDATE_RENDER_MUTATION = `mutation updateRender($where: RenderWhereUniqueInput!, $data: RenderUpdateInput!){
  updateRender(data: $data, where: $where) {
    id
  }
}
`

/**
 * Uses the passed Prisma client to query the DB for any `Render` objects 
 * with a status of `Queued`. If found, an object is returned containing the 
 * id of the `Render` and its corresponding `Script` 
 * @param client GraphQLClient passed to avoid duplicate connections
 * @returns IRenderMap: `{renderId: number, scriptId: number}` or `null`
 */
export const checkQueue = async (client: GraphQLClient) => {
  const variables: QueryRendersArgs = {
    where: { status: { equals: RenderStatus.Queued } },
  }
  try {
    const { renders } = await client.request<{ renders: Render[] }>(
      CHECK_QUE_QUERY,
      variables,
    )
    const renderMap: IRenderMap = renders.map((r) => {
      return { scriptId: r.script.id, renderId: r.id }
    })[0]

    return renderMap || null
  } catch (e) {
    throw e
  }
}

/**
 * 
 * @param client GraphQLClient passed to avoid duplicate connections
 * @param args Arguments for the GraphQL call: `where` & `data`
 */
export const updateRender = async (
  client: GraphQLClient,
  args: MutationUpdateOneRenderArgs,
) => {
  try {
    await client.request<MutationUpdateOneRenderArgs>(
      UPDATE_RENDER_MUTATION,
      args,
    )
  } catch (e) {
    throw e
  }
}

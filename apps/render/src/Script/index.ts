import { GraphQLClient } from 'graphql-request'

import { Video, Customer, Order } from '@lumina/api'

import { Script } from './Script'

const GET_SCRIPT_QUERY = `query script($where: ScriptWhereUniqueInput!){
  script(where: $where) {
    id, 
    name,
    layers, 
    flavor,
    video { id, vimeoId },
    request { customer { id }}
    order { id }
  }
}
`

export interface ScriptQuery extends Pick<Script, 'id' | 'flavor' | 'name'> {
  video: Pick<Video, 'id' | 'vimeoId'> | null
  layers: Script['layers']
  request: { customer: Pick<Customer, 'id'> }
  order: Pick<Order, 'id'>
}

const get = async (
  client: GraphQLClient,
  scriptId: number,
): Promise<ScriptQuery> => {
  const variables = {
    where: { id: scriptId },
  }
  try {
    const { script }: { script: ScriptQuery } = await client.request(
      GET_SCRIPT_QUERY,
      variables,
    )
    return script
  } catch (e) {
    throw e
  }
}

export default {
  get,
}

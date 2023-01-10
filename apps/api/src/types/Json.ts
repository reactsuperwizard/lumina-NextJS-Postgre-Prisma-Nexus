import { asNexusMethod } from 'nexus'
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json'

export const GQLJSON = asNexusMethod(GraphQLJSON, 'json')
export const GQLJSONObject = asNexusMethod(GraphQLJSONObject, 'jsonObject')

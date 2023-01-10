import { gql } from '@apollo/client'
import { User, Video, Request, Customer, RequestLog } from '@lumina/api'
import type { Script as RenderScript } from '@lumina/render/src/Script/Script'

export type GetScriptQuery = Pick<
  RenderScript,
  | 'id'
  | 'name'
  | 'createdAt'
  | 'updatedAt'
  | 'flavor'
  | 'globals'
  | 'layers'
  | 'slides'
  | 'customerUpdate'
> & {
  producer: Pick<User, 'email' | 'id'>
  video: Pick<Video, 'id' | 'vimeoId' | 'checkReady'>
  request: Pick<
    Request,
    | 'id'
    | 'url'
    | 'message'
    | 'notes'
    | 'basePrice'
    | 'bonusPrice'
    | 'bonusDeadline'
    | 'jobTitle'
    | 'status'
  > & {
    logs: (Pick<RequestLog, 'id' | 'event' | 'createdAt'> & {
      user: Pick<User, 'email' | 'id' | 'firstName' | 'lastName'>
    })[]
  }

  customer: Pick<Customer, 'id' | 'name' | 'notes'>
}

export const GET_SCRIPT = gql`
  query script($where: ScriptWhereUniqueInput!) {
    script(where: $where) {
      id
      name
      createdAt
      updatedAt
      flavor
      globals
      layers
      slides
      customer {
        id
        name
        notes
      }
      customerUpdate
      request {
        id
        url
        message
        notes
        basePrice
        bonusPrice
        jobTitle
        bonusDeadline
        status
        logs {
          event
          createdAt
          user {
            id
            firstName
            lastName
          }
        }
      }
      producer {
        email
        id
      }
      video {
        id
        vimeoId
        checkReady
      }
    }
  }
`

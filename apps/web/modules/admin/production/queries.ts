import { gql } from '@apollo/client'
import { Customer, Order, Request, Script, User, Video } from '@lumina/api'

export const GET_REQUESTS = gql`
  query requests(
    $where: RequestWhereInput
    $orderBy: [RequestOrderByInput!]
    $take: Int
    $skip: Int
  ) {
    requests(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
      id
      jobTitle
      status
      createdAt
      owner {
        id
        email
      }
      customer {
        id
        name
      }
    }
  }
`

export interface GetRequestsQuery
  extends Pick<Request, 'jobTitle' | 'id' | 'createdAt' | 'status'> {
  owner: Pick<User, 'id' | 'email'>
  customer: Pick<Customer, 'id' | 'name'>
}

export const GET_REQUEST = gql`
  query request($where: RequestWhereUniqueInput!) {
    request(where: $where) {
      id
      jobTitle
      status
      message
      notes
      createdAt
      owner {
        id
        email
      }
      customer {
        id
        name
      }
      order {
        id
      }
      script {
        id
        flavor
      }
      video {
        id
        vimeoId
        checkReady
      }
    }
  }
`

export interface GetRequestQuery
  extends Pick<
    Request,
    'jobTitle' | 'id' | 'createdAt' | 'status' | 'message' | 'notes'
  > {
  owner: Pick<User, 'id' | 'email'>
  customer: Pick<Customer, 'id' | 'name'>
  order: Pick<Order, 'id'>
  script: Pick<Script, 'id' | 'flavor'>
  video: Pick<Video, 'id' | 'vimeoId' | 'checkReady'>
}

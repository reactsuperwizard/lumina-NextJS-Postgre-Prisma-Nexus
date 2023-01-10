import { gql } from '@apollo/client'

export const GET_REQUESTS = gql`
  query totalRequests($where: RequestWhereInput) {
    totalRequests(where: $where) {
      count
    }
  }
`

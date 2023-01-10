import { gql } from '@apollo/client'

export const GET_USERS = gql`
  query totalUsers($where: UserWhereInput) {
    totalUsers(where: $where) {
      count
    }
  }
`

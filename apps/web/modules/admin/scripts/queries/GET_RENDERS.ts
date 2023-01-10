import { gql } from '@apollo/client'
import { Render, Script } from '@lumina/api'

export type GetRendersQuery = Pick<
  Render,
  | 'id'
  | 'status'
  | 'queuedAt'
  | 'updatedAt'
> & {
  script: Pick<Script, 'id'>
}

export const GET_RENDERS = gql`
  query renders($where: RenderWhereInput) {
    renders(where: $where, take: 5, orderBy: { updatedAt: desc }) {
      id
      script {
        id
      }
      status
      queuedAt
      updatedAt
    }
  }
`
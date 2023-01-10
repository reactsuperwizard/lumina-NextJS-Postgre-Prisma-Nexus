import { gql } from '@apollo/client'
import { Render } from '@lumina/api'

export type GetRenderQuery = Pick<
  Render,
  | 'id'
  | 'progress'
  | 'status'
> 

export const GET_RENDER = gql`
query render($where: RenderWhereUniqueInput!) {
  render(where: $where) {
    id
    progress
    status
  }
}
`
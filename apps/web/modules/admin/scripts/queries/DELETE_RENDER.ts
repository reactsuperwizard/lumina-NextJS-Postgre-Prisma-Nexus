import { gql } from '@apollo/client'
import { Render } from '@lumina/api'

export type DeleteRenderMutation = Pick<Render, 'id'>

export const DELETE_RENDER = gql`
  mutation deleteOneRender($where: RenderWhereUniqueInput!) {
    deleteOneRender(where: $where) {
      id
    }
  }
`

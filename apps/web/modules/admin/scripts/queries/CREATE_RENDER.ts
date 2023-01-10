import { gql } from '@apollo/client'
import { Render, Script } from '@lumina/api'

export type CreateRenderMutation = Pick<
  Render,
  | 'id'
  | 'status'
> & {
  script: Pick<Script, 'id'>
}

export const CREATE_RENDER = gql`
  mutation createRender($data: RenderCreateInput!) {
    queuedRender: createRender(data: $data) {
      id
      status
      script {
        id
      }
    }
  }
`

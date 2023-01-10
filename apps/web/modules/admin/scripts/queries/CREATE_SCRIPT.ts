import { gql } from '@apollo/client'
import { Script } from '@lumina/api'

export interface CreateScriptMutation {
  script: Pick<Script, 'id'>
}

export const CREATE_SCRIPT = gql`
  mutation createScript($data: ScriptCreateInput!) {
    script: createScript(data: $data) {
      id
    }
  }
`

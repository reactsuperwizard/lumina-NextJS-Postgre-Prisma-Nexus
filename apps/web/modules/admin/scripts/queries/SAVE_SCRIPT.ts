import { gql } from '@apollo/client'
import type { Script as RenderScript } from '@lumina/render/src/Script/Script'

export type SaveScriptMutation = Pick<
  RenderScript,
  | 'id'
  | 'name'
  | 'createdAt'
  | 'updatedAt'
  | 'flavor'
  | 'globals'
  | 'layers'
  | 'slides'
>

export const SAVE_SCRIPT = gql`
  mutation updateOneScript(
    $where: ScriptWhereUniqueInput!
    $data: ScriptUpdateInput!
  ) {
    script: updateOneScript(where: $where, data: $data) {
      id
      name
      createdAt
      updatedAt
      flavor
      globals
      layers
      slides
      customerUpdate
    }
  }
`

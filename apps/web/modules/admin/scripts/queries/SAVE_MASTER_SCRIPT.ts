import { gql } from '@apollo/client'
import { MasterTemplate } from '@lumina/api'

export type SaveMasterScriptMutation = Pick<MasterTemplate, 'id'>

export const SAVE_MASTER_SCRIPT = gql`
  mutation Mutation(
    $data: MasterTemplateUpdateInput!
    $where: MasterTemplateWhereUniqueInput!
  ) {
    updateOneMasterTemplate(data: $data, where: $where) {
      id
    }
  }
`

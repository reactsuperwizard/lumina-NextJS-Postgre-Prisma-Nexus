import { gql } from '@apollo/client'
import { Flavor } from '@lumina/render/src/flavors'

export interface GetFlavorQuery {
  flavor: Flavor
}

export const GET_FLAVOR = gql`
  query flavor($name: TemplateFlavor!) {
    flavor(name: $name)
  }
`

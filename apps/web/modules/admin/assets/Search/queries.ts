import { gql } from '@apollo/client'
import {
  Asset,
  CloudinaryAssets,
  CloudinaryGetAssets,
  Folder,
} from '@lumina/api'

export const GET_ASSETS = gql`
  query getAssetsByTag($params: CloudinaryGetAssetsInput) {
    getAssets(params: $params) {
      total_count
      next_cursor
      time
      rate_limit_remaining
      rate_limit_reset_at
      resources {
        public_id
        tags
        secure_url
        resource_type
      }
    }
  }
`

export const GET_ASSET = gql`
  query asset($where: AssetWhereUniqueInput!) {
    asset(where: $where) {
      id
      folder {
        id
      }
    }
  }
`

export interface GetCloudinaryAssets
  extends Pick<
    CloudinaryAssets,
    | 'total_count'
    | 'next_cursor'
    | 'time'
    | 'rate_limit_remaining'
    | 'rate_limit_reset_at'
  > {
  resources: PickedCloudinaryResources[]
}

export interface PickedCloudinaryResources extends Pick<
CloudinaryGetAssets,
'public_id' | 'tags' | 'secure_url' | 'resource_type'
> {}

export interface GetAssetQuery extends Pick<Asset, 'id'> {
  folder: Pick<Folder, 'id'>
}

import { gql } from '@apollo/client'
import { Asset, Folder } from '@lumina/api'

export const GET_FOLDER = gql`
  query getFolder($where: FolderWhereUniqueInput!) {
    folder(where: $where) {
      id
      name
      children(orderBy: { name: asc }) {
        id
        name
      }
      assets(orderBy: { name: asc }) {
        id
        publicId
        assetType
        url
        name
      }
      parent {
        id
        name
        parent {
          id
          name
        }
      }
    }
  }
`

export interface GetFolderQuery extends Pick<Folder, 'name' | 'id'> {
  children: Pick<Folder, 'name' | 'id'>[]
  parent?: Pick<Folder, 'name' | 'id'> & {
    parent?: Pick<Folder, 'name' | 'id'>
  }
  assets: Pick<Asset, 'id' | 'publicId' | 'assetType' | 'url' | 'name'>[]
}

export const GET_FOLDER_PARENTS = gql`
  query getFolder($where: FolderWhereUniqueInput!) {
    folder(where: $where) {
      id
      name
      parent {
        id
        name
        parent {
          id
          name
        }
      }
    }
  }
`

export interface GetFolderParentsQuery extends Pick<Folder, 'name' | 'id'> {
  parent?: Pick<Folder, 'name' | 'id'> & {
    parent?: Pick<Folder, 'name' | 'id'> 
  }
}
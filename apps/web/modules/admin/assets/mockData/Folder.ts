import { Customer } from '@lumina/api'

export type Asset = {
  id: number
  publicId: string
  assetType: AssetType
  url: string
  name?: string
  folderId: number
  folder?: Folder
}

export type Folder = {
  id: number
  parent?: Folder
  children: Folder[]
  assets: Asset[]
  name: string
  tenant?: Customer
}

export enum AssetType {
  image,
  video,
  audio,
  raw,
}

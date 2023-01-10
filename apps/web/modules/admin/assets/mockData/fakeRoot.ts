import { Folder } from '@lumina/api'
import { assetData } from './dummyData'
// import { Folder } from "./Folder";

export const fakeRoot: Folder = {
  createdAt: null,
  updatedAt: null,
  id: 0,
  children: [
    {
      createdAt: null,
      updatedAt: null,
      id: 1,
      children: [],
      assets: [],
      name: 'folder 1',
    },
    {
      createdAt: null,
      updatedAt: null,
      id: 2,
      children: [],
      assets: [],
      name: 'folder 2',
    },
    {
      createdAt: null,
      updatedAt: null,
      id: 3,
      children: [],
      assets: [],
      name: 'folder 3',
    },
    {
      createdAt: null,
      updatedAt: null,
      id: 4,
      children: [],
      assets: [],
      name: 'folder 4',
    },
  ],
  assets: assetData,
  name: 'assets',
}

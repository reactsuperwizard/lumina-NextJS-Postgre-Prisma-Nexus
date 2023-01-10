export interface IRenderMap {
  renderId: number
  scriptId: number
}

export interface INexrenderTemplate {
  src: string
  composition: 'Main'
  outputExt: 'mov' | 'avi' // windows render will output .avi by default - our default codec is quicktime so this must be provided.
  frameStart?: number
  frameEnd?: number
}

export interface INexrenderFootageAsset {
  src: string
  type: 'image' | 'audio'
  layerName: string
}

export interface INexrenderDataAsset {
  type: 'data'
  layerName: string
  property: 'source.mainSource.color' | 'Text.Source Text' | string
  value: string | [number, number, number]
  composition: '_control'
}

export interface IJob {
  aeRenderData: {
    template: INexrenderTemplate
    assets: (INexrenderDataAsset | INexrenderFootageAsset)[]
  }
  scriptId: number
}

export {
  T1,
  T2,
  T4,
  T6,
  T7,
  T8,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  T16,
  E1,
} from './flavors'

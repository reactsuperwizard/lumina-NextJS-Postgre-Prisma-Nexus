import { Script as _Script } from '@lumina/api'
import { Flavor } from '../flavors'
import {
  Color as FlavorColor,
  Text as FlavorText,
  TextArea as FlavorTextArea,
  Audio as FlavorAudio,
  Image as FlavorImage,
  Select as FlavorSelect,
} from '../flavors/Flavor'

interface DataLayer {
  value: string // should be hex or [r,g,b] - good way to type?
  scriptVariable: string
  slideType?: boolean
}

interface AssetLayer {
  id: string
  scriptVariable: string
}

export type Color = DataLayer & FlavorColor

type Text = DataLayer & FlavorText
type TextArea = DataLayer & FlavorTextArea

type Audio = AssetLayer & FlavorAudio

type Image = AssetLayer & FlavorImage

type Select = DataLayer & FlavorSelect

export type Layer = Color | Text | Image | Audio | TextArea | Select

export interface Layers {
  [layerName: string]: Layer
}

export interface Script extends _Script {
  layers: Layers
  globals: Flavor['globals']
  slides: Flavor['slides']
}

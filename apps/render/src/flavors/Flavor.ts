import { INexrenderTemplate } from '../types'

interface Layer {
  fieldType: 'color' | 'text' | 'textArea' | 'image' | 'audio' | 'select'
  description?: string // Description of the field to make how variables are used more obvious
  scriptVariable?: string
  value?: string
  id?: string
  url?: string // Used to store image URL
  name?: string // Used to store image name
  options?: string[]
  slideType?:
    | 'left50-gradient'
    | 'left50-testimonial'
    | 'middle-row'
    | 'middle-box'
    | 'top-arc-intro'
    | 'top-arc-cta'
    | 'right-arc-title'
    | 'right-arc-bullets'
    | 'right-arc-testimonial'
}

export interface Color extends Layer {
  property: 'Effects.Fill.Color'
  fieldType: 'color'
  type: 'data'
  composition: '_control'
}

interface Textish extends Layer {
  property: 'Text.Source Text'
  type: 'data'
  composition: '_control'
  minLength?: number // minimum number of characters total
  maxLength?: number // maximum number of characters total
}

export interface Text extends Textish {
  fieldType: 'text'
}

export interface TextArea extends Textish {
  fieldType: 'textArea'
  lineLength?: number // number of characters per line
}

export interface Image extends Layer {
  fieldType: 'image'
  type: 'image'
}

export interface Audio extends Layer {
  fieldType: 'audio'
  type: 'audio'
}

export interface Select extends Layer {
  fieldType: 'select'
  type: 'select'
}

interface Layers {
  [layerName: string]: Color | Text | TextArea | Image | Audio | Select
}

interface Meta {
  description: string
  orientation: string
  duration: number
  imageUrl: string
  vimeoId?: string
  category: 'Job Postings' | 'Events' | 'Posters'
}
export interface FlavorBase {
  name: string
  meta: Meta
}
export interface Flavor extends FlavorBase {
  template: INexrenderTemplate
  layers: Layers
  globals: string[]
  slides: string[][]
}

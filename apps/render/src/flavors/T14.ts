import { Flavor } from './Flavor'

import path from 'path'

export const T14: Flavor = {
  name: 'Pumpkin',
  meta: {
    description:
      'Shorter and sweeter, this animated poster is perfect for social media feeds and Gen Z candidates',
    orientation: '16:9',
    duration: 8,
    imageUrl:
      'https://res.cloudinary.com/hdngr/image/upload/v1655344227/thumbnails/2594.jpg',
    vimeoId: '720897161',
    category: 'Posters',
  },
  template: {
    src: `file://${path.join(__dirname, '../../render-templates/T14.aep')}`,
    composition: 'Main',
    outputExt: 'mov',
  },
  layers: {
    soundTrack: {
      type: 'audio',
      fieldType: 'audio',
      scriptVariable: 'Soundtrack',
    },
    brandColor1: {
      type: 'data',
      property: 'Effects.Fill.Color',
      composition: '_control',
      fieldType: 'color',
      description: 'Brand Color, Main Line',
      scriptVariable: 'Brand Color, Main Line',
    },
    logo: {
      type: 'image',
      fieldType: 'image',
      scriptVariable: 'Logo',
    },
    jobTitle: {
      type: 'data',
      property: 'Text.Source Text',
      composition: '_control',
      fieldType: 'text',
      maxLength: 25,
      scriptVariable: 'Job Title',
    },
    bullet1: {
      type: 'data',
      property: 'Text.Source Text',
      composition: '_control',
      fieldType: 'textArea',
      maxLength: 48,
      lineLength: 24,
      scriptVariable: '1st bullet point',
    },
    bullet2: {
      type: 'data',
      property: 'Text.Source Text',
      composition: '_control',
      fieldType: 'textArea',
      maxLength: 48,
      lineLength: 24,
      scriptVariable: '2nd bullet point',
    },
    bullet3: {
      type: 'data',
      property: 'Text.Source Text',
      composition: '_control',
      fieldType: 'textArea',
      maxLength: 48,
      lineLength: 24,
      scriptVariable: '3rd bullet point',
    },
    callToAction: {
      type: 'data',
      property: 'Text.Source Text',
      composition: '_control',
      fieldType: 'text',
      maxLength: 13,
      scriptVariable: 'Call to action',
    },
  },
  globals: ['soundTrack', 'logo', 'brandColor1', 'jobTitle'],
  slides: [['bullet1', 'bullet2', 'bullet3'], ['callToAction']],
}

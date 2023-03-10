import { Flavor } from './Flavor'

import path from 'path'

export const T15: Flavor = {
  name: 'Pickle',
  meta: {
    description:
      'Short and sweet, this template features full screen images and an opportunity for highlighting key points about the role.',
    orientation: '16:9',
    duration: 12,
    imageUrl:
      'https://res.cloudinary.com/hdngr/image/upload/v1652309149/thumbnails/1864.jpg',
    vimeoId: '740787586',
    category: 'Job Postings',
  },
  template: {
    src: `file://${path.join(__dirname, '../../render-templates/T15.aep')}`,
    composition: 'Main',
    outputExt: 'mov',
  },
  layers: {
    soundTrack: {
      type: 'audio',
      fieldType: 'audio',
      scriptVariable: 'Soundtrack',
    },
    bgColor: {
      type: 'data',
      property: 'Effects.Fill.Color',
      composition: '_control',
      fieldType: 'color',
      description: 'Background color for slides.',
      scriptVariable: 'Background Color',
      value: '#ffffff',
    },
    primaryTextColor: {
      type: 'data',
      property: 'Effects.Fill.Color',
      composition: '_control',
      fieldType: 'color',
      description: 'Main Text Color',
      scriptVariable: 'Main Text Color',
    },
    secondaryTextColor: {
      type: 'data',
      property: 'Effects.Fill.Color',
      composition: '_control',
      fieldType: 'color',
      description: 'Used tag line and call to action',
      scriptVariable: 'Tag line, Call to action,',
    },
    brandColor1: {
      type: 'data',
      property: 'Effects.Fill.Color',
      composition: '_control',
      fieldType: 'color',
      description: 'Brand Color, Main Line',
      scriptVariable: 'Brand Color, Main Line',
    },
    brandColor2: {
      type: 'data',
      property: 'Effects.Fill.Color',
      composition: '_control',
      fieldType: 'color',
      description: 'Header, Animation Line',
      scriptVariable: 'Header, Animation Line',
    },
    logo: {
      type: 'image',
      fieldType: 'image',
      scriptVariable: 'Logo',
    },
    coverPhoto: {
      type: 'image',
      fieldType: 'image',
      scriptVariable: 'Cover Photo',
    },
    tagLine: {
      type: 'data',
      fieldType: 'text',
      property: 'Text.Source Text',
      composition: '_control',
      maxLength: 16,
      scriptVariable: 'We???re Hiring!',
      value: 'We???re Hiring!',
    },
    position: {
      type: 'data',
      property: 'Text.Source Text',
      composition: '_control',
      fieldType: 'text',
      maxLength: 28,
      scriptVariable: 'Position',
    },
    location: {
      type: 'data',
      property: 'Text.Source Text',
      composition: '_control',
      fieldType: 'text',
      maxLength: 28,
      scriptVariable: 'Location',
    },
    titleTwo: {
      type: 'data',
      property: 'Text.Source Text',
      composition: '_control',
      fieldType: 'text',
      maxLength: 16,
      scriptVariable: '2nd Slide Title',
    },
    lineOne: {
      type: 'data',
      property: 'Text.Source Text',
      composition: '_control',
      fieldType: 'textArea',
      maxLength: 74,
      lineLength: 36,
      scriptVariable: '1st bullet point',
    },
    lineTwo: {
      type: 'data',
      property: 'Text.Source Text',
      composition: '_control',
      fieldType: 'textArea',
      maxLength: 74,
      lineLength: 36,
      scriptVariable: '2nd bullet point',
    },
    lineThree: {
      type: 'data',
      property: 'Text.Source Text',
      composition: '_control',
      fieldType: 'textArea',
      maxLength: 74,
      lineLength: 36,
      scriptVariable: '3rd bullet point',
    },
  },
  globals: [
    'soundTrack',
    'logo',
    'bgColor',
    'primaryTextColor',
    'secondaryTextColor',
    'brandColor1',
    'brandColor2',
  ],
  slides: [
    ['tagLine', 'position', 'location', 'coverPhoto'],
    ['titleTwo', 'lineOne', 'lineTwo', 'lineThree'],
  ],
}

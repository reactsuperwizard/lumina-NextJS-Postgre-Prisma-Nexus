import { TemplateFlavor } from '@lumina/api'
import { ScriptQuery } from '../src/Script'

export const T14: ScriptQuery = {
  id: 14,
  flavor: TemplateFlavor.T14,
  video: null,
  request: {
    customer: {
      id: 22,
    },
  },
  order: {
    id: 20,
  },
  layers: {
    soundTrack: {
      type: 'audio',
      fieldType: 'audio',
      scriptVariable: 'Soundtrack',
      id: '2771',
    },
    brandColor1: {
      type: 'data',
      property: 'Effects.Fill.Color',
      composition: '_control',
      fieldType: 'color',
      description: 'Main Bubbles',
      scriptVariable: 'Main bubbles',
      value: '#4223a8',
    },
    logo: {
      type: 'image',
      fieldType: 'image',
      scriptVariable: 'Logo',
      id: '1062',
    },
    callToAction: {
      type: 'data',
      fieldType: 'text',
      property: 'Text.Source Text',
      composition: '_control',
      maxLength: 26,
      scriptVariable: 'Call to Action',
      value: 'Apply Now',
    },
    jobTitle: {
      type: 'data',
      fieldType: 'text',
      property: 'Text.Source Text',
      composition: '_control',
      maxLength: 70,
      scriptVariable: 'Line one',
      value: 'Eat food whenever you want to ',
    },
    bullet1: {
      type: 'data',
      fieldType: 'text',
      property: 'Text.Source Text',
      composition: '_control',
      maxLength: 70,
      scriptVariable: 'Line one',
      value: 'Eat food whenever you want to ',
    },
    bullet2: {
      type: 'data',
      fieldType: 'text',
      property: 'Text.Source Text',
      composition: '_control',
      maxLength: 70,
      scriptVariable: 'Line Two',
      value: 'We will give everyone a million dollars a week for 2 years ',
    },
    bullet3: {
      type: 'data',
      fieldType: 'text',
      property: 'Text.Source Text',
      composition: '_control',
      maxLength: 70,
      scriptVariable: 'Line three',
      value:
        'Bring your Rat to work, we want all rats all the time. Predators to rats please do not bring in. THings will get messy ',
    },
  },
}

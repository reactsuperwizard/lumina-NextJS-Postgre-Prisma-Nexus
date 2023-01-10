import { TemplateFlavor } from '@lumina/api'
import { ScriptQuery } from '../src/Script'

export const T16: ScriptQuery = {
  id: 16,
  flavor: TemplateFlavor.T16,
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
    soundtrack: {
      type: 'audio',
      fieldType: 'audio',
      scriptVariable: 'soundtrack',
      id: '2771',
    },
    backgroundColor: {
      type: 'data',
      property: 'Effects.Fill.Color',
      composition: '_control',
      fieldType: 'color',
      description: 'Background color for slides.',
      scriptVariable: 'Background Color',
      value: '#3d445f',
    },
    primaryTextColor: {
      type: 'data',
      property: 'Effects.Fill.Color',
      composition: '_control',
      fieldType: 'color',
      description: 'Used for tag line and job position text.',
      scriptVariable: 'Primary Text Color',
      value: '#000000',
    },
    logo: {
      type: 'image',
      fieldType: 'image',
      scriptVariable: 'Logo',
      id: '1062',
    },
    coverPhoto: {
      type: 'image',
      fieldType: 'image',
      scriptVariable: 'Logo',
      id: '1553',
    },
    tagline: {
      type: 'data',
      fieldType: 'text',
      property: 'Text.Source Text',
      composition: '_control',
      maxLength: 20,
      scriptVariable: 'We’re Hiring!',
      value: 'We’re Hiring!',
    },
    position: {
      type: 'data',
      property: 'Text.Source Text',
      composition: '_control',
      fieldType: 'text',
      maxLength: 20,
      scriptVariable: 'Position',
      value: 'Rat trainer and 0000',
    },
    location: {
      type: 'data',
      fieldType: 'text',
      property: 'Text.Source Text',
      composition: '_control',
      maxLength: 18,
      scriptVariable: 'Location',
      value: 'Portland OR',
    },
    locationTitle: {
      type: 'data',
      fieldType: 'text',
      property: 'Text.Source Text',
      composition: '_control',
      maxLength: 18,
      scriptVariable: 'Location Title',
      value: 'Located In ',
    },
    slideThreeText: {
      type: 'data',
      property: 'Text.Source Text',
      composition: '_control',
      fieldType: 'textArea',
      maxLength: 72,
      scriptVariable: 'Slide Three Text',
      value: 'Here we have amazing deals 00000000000',
    },
    slideThreeTitle: {
      type: 'data',
      fieldType: 'text',
      property: 'Text.Source Text',
      composition: '_control',
      maxLength: 16,
      scriptVariable: 'Slide Three Title',
      value: 'Responsibilities',
    },
    slideFourTitle: {
      type: 'data',
      fieldType: 'text',
      property: 'Text.Source Text',
      composition: '_control',
      maxLength: 16,
      scriptVariable: 'Slide Four Title',
      value: ' ',
    },
    testimonial: {
      type: 'data',
      fieldType: 'textArea',
      property: 'Text.Source Text',
      composition: '_control',
      maxLength: 78,
      scriptVariable: 'Testimonial Text',
      value: 'Great Place and amazing workforce!',
    },
    bulletPointOne: {
      type: 'data',
      fieldType: 'textArea',
      property: 'Text.Source Text',
      composition: '_control',
      maxLength: 42,
      scriptVariable: 'Line one',
      value: 'Eat food whenever you want to ',
    },

    bulletPointTwo: {
      type: 'data',
      fieldType: 'textArea',
      property: 'Text.Source Text',
      composition: '_control',
      maxLength: 42,
      scriptVariable: 'Line Two',
      value: 'We will give everyone a million dollars a week for 2 years ',
    },
    bulletPointThree: {
      type: 'data',
      fieldType: 'textArea',
      property: 'Text.Source Text',
      composition: '_control',
      maxLength: 42,
      scriptVariable: 'Line three',
      value:
        'Bring your Rat to work, we want all rats all the time. Predators to rats please do not bring in. THings will get messy ',
    },
    callToAction: {
      type: 'data',
      property: 'Text.Source Text',
      composition: '_control',
      fieldType: 'text',
      maxLength: 19,
      scriptVariable: 'Position',
      value: 'Hurry Apply Now',
    },
  },
}

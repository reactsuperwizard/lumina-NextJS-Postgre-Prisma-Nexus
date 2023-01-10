import { TemplateFlavor } from '@lumina/api'
import { ScriptQuery } from '../src/Script'

export const T6: ScriptQuery = {
  id: 235,
  flavor: TemplateFlavor.T6,
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
    logo: {
      id: '1061',
      type: 'image',
      fieldType: 'image',
      scriptVariable: 'Logo',
    },
    bgColor: {
      type: 'data',
      value: '#3f24b7',
      property: 'Effects.Fill.Color',
      fieldType: 'color',
      composition: '_control',
      description: 'Background color for slides.',
      scriptVariable: 'Main Background Color',
    },
    iconOne: {
      id: '204',
      type: 'image',
      fieldType: 'image',
      scriptVariable: 'Line Icon',
    },
    iconTwo: {
      id: '220',
      type: 'image',
      fieldType: 'image',
      scriptVariable: 'Location Icon',
    },
    lineOne: {
      type: 'data',
      value: 'We work super hard - but we play harder!',
      property: 'Text.Source Text',
      fieldType: 'textArea',
      maxLength: 54,
      lineLength: 27,
      composition: '_control',
      scriptVariable: 'Line One',
    },
    lineSix: {
      type: 'data',
      value: "It's big business, but we're down to earth",
      property: 'Text.Source Text',
      fieldType: 'textArea',
      maxLength: 50,
      lineLength: 25,
      composition: '_control',
      scriptVariable: 'Line Six',
    },
    lineTwo: {
      type: 'data',
      value: 'Startup life is easy (said no one ever)',
      property: 'Text.Source Text',
      fieldType: 'textArea',
      maxLength: 54,
      lineLength: 27,
      composition: '_control',
      scriptVariable: 'Line Two',
    },
    tagLine: {
      type: 'data',
      value: "We're Hiring:",
      property: 'Text.Source Text',
      fieldType: 'text',
      maxLength: 20,
      composition: '_control',
      scriptVariable: '',
    },
    lineFive: {
      type: 'data',
      value: 'Text job postings are out - video is in',
      property: 'Text.Source Text',
      fieldType: 'textArea',
      maxLength: 50,
      lineLength: 25,
      composition: '_control',
      scriptVariable: 'Line Five',
    },
    lineFour: {
      type: 'data',
      value: "We're revolutionizing recruiting",
      property: 'Text.Source Text',
      fieldType: 'textArea',
      maxLength: 50,
      lineLength: 25,
      composition: '_control',
      scriptVariable: 'Line Four',
    },
    location: {
      type: 'data',
      value: 'Portland, OR, USA',
      property: 'Text.Source Text',
      fieldType: 'text',
      maxLength: 20,
      composition: '_control',
      scriptVariable: '',
    },
    position: {
      type: 'data',
      value: 'Chief Cat Herder',
      property: 'Text.Source Text',
      fieldType: 'text',
      maxLength: 20,
      composition: '_control',
      scriptVariable: '',
    },
    lineThree: {
      type: 'data',
      value: "But, we're old and no one is eating Ramen",
      property: 'Text.Source Text',
      fieldType: 'textArea',
      maxLength: 54,
      lineLength: 27,
      composition: '_control',
      scriptVariable: 'Line Three',
    },
    utilColor: {
      type: 'data',
      value: '#f4ac04',
      property: 'Effects.Fill.Color',
      fieldType: 'color',
      composition: '_control',
      description: 'used for buttons and icons.',
      scriptVariable: 'Buttons and Things',
    },
    soundTrack: {
      id: '1065',
      type: 'audio',
      fieldType: 'audio',
      scriptVariable: 'Sound Track',
    },
    testimonial: {
      type: 'data',
      value:
        "We're having tons of fun. Recruiting is big biz - we're down to earth.",
      property: 'Text.Source Text',
      fieldType: 'textArea',
      maxLength: 70,
      lineLength: 35,
      composition: '_control',
      scriptVariable: 'Testimonial Block',
    },
    callToAction: {
      type: 'data',
      value: 'Apply Now',
      property: 'Text.Source Text',
      fieldType: 'text',
      maxLength: 20,
      composition: '_control',
      scriptVariable: 'Last Slide "Button"',
    },
    slideTwoBody: {
      type: 'data',
      value:
        "We're revolutionizing the way brands tell their story to top talent.",
      property: 'Text.Source Text',
      fieldType: 'textArea',
      maxLength: 96,
      lineLength: 48,
      composition: '_control',
      scriptVariable: 'Slide Two Body - Block Text',
    },
    slideTwoTitle: {
      type: 'data',
      value: 'Our Mission:',
      property: 'Text.Source Text',
      fieldType: 'text',
      maxLength: 17,
      composition: '_control',
      scriptVariable: 'Slide Two Title',
    },
    slideFiveTitle: {
      type: 'data',
      value: 'Testimonial',
      property: 'Text.Source Text',
      fieldType: 'text',
      maxLength: 16,
      composition: '_control',
      scriptVariable: 'Testimonial (will be ALL CAPS)',
    },
    slideFourTitle: {
      type: 'data',
      value: 'Our Passion',
      property: 'Text.Source Text',
      fieldType: 'text',
      maxLength: 20,
      composition: '_control',
      scriptVariable: 'Slide Four Title',
    },
    slideThreeTitle: {
      type: 'data',
      value: 'Our Team',
      property: 'Text.Source Text',
      fieldType: 'text',
      maxLength: 20,
      composition: '_control',
      scriptVariable: 'Slide Three Title',
    },
    slideTwoBgImage: {
      id: '764',
      type: 'image',
      fieldType: 'image',
      scriptVariable: 'Slide 2 Background (Upper 50% Focus)',
    },
    testimonialName: {
      type: 'data',
      value: '- Liam, Lead Engineer',
      property: 'Text.Source Text',
      fieldType: 'text',
      maxLength: 40,
      composition: '_control',
      scriptVariable: 'Testimonial Name',
    },
    primaryTextColor: {
      type: 'data',
      value: '#090a3f',
      property: 'Effects.Fill.Color',
      fieldType: 'color',
      composition: '_control',
      description: 'Used for titles and the main text on a slide.',
      scriptVariable: 'Text Color for Titles (should stand out less)',
    },
    slideFiveBgImage: {
      id: '724',
      type: 'image',
      fieldType: 'image',
      scriptVariable: 'Slide Five Background Image (Top 50%)',
    },
    slideFourBgImage: {
      id: '663',
      type: 'image',
      fieldType: 'image',
      scriptVariable: 'Slide Four Background Image (Right Focus)',
    },
    slideThreeBgImage: {
      id: '759',
      type: 'image',
      fieldType: 'image',
      scriptVariable: 'Slide Three Background (Left Focus)',
    },
    secondaryTextColor: {
      type: 'data',
      value: '#ffffff',
      property: 'Effects.Fill.Color',
      fieldType: 'color',
      composition: '_control',
      description:
        'Used for sub titles and secondary text on a slide (hint: can be the same as any of the other colors if you want!).',
      scriptVariable: 'The Color for Subtitles (should stand out more)',
    },
  },
}

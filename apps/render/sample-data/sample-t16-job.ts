import { IJob } from '../src/types'

import path from 'path'
const outputExt = process.platform === 'win32' ? 'avi' : 'mov'
export const T16: IJob = {
  scriptId: 16,
  aeRenderData: {
    template: {
      src: `file://${path.resolve(__dirname, '../render-templates/T16.aep')}`,
      composition: 'Main',
      outputExt,
    },
    assets: [
      {
        src: 'https://res.cloudinary.com/hdngr/video/authenticated/s--Z4EWuUu2--/v1630074590/assets/140/Avocado_Junkie_Destination_Freedom_instrumental_2_36_jsqdry.mp3',
        type: 'audio',
        layerName: 'soundtrack',
      },
      {
        type: 'data',
        layerName: 'backgroundColor',
        property: 'Effects.Fill.Color',
        value: [2, 2, 2],
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'primaryTextColor',
        property: 'Effects.Fill.Color',
        value: [0, 0, 0],
        composition: '_control',
      },
      {
        src: 'https://res.cloudinary.com/hdngr/image/authenticated/s--o2iiPScg--/v1611005055/Lumina/Color_Positive_3x_jwrvoe.png',
        type: 'image',
        layerName: 'logo',
      },
      {
        src: 'https://res.cloudinary.com/hdngr/image/authenticated/s--jSOlwL9f--/v1633556703/assets/160/construction3_jk9kuk.png',
        type: 'image',
        layerName: 'coverPhoto',
      },
      {
        src: 'https://res.cloudinary.com/hdngr/image/authenticated/s--onajshKu--/v1616559061/assets/105/00089_AdobeStock_1920x1080_ysxbq3.png',
        type: 'image',
        layerName: 'slideTwoPhoto',
      },
      {
        src: 'https://res.cloudinary.com/hdngr/image/authenticated/s--kVjfayXi--/v1634245160/assets/184/cook1_nunh3w.png',
        type: 'image',
        layerName: 'slideThreePhoto',
      },
      {
        src: 'https://res.cloudinary.com/hdngr/image/authenticated/s--kVjfayXi--/v1634245160/assets/184/cook1_nunh3w.png',
        type: 'image',
        layerName: 'slideFourPhoto',
      },
      {
        src: 'https://res.cloudinary.com/hdngr/image/authenticated/s--kVjfayXi--/v1634245160/assets/184/cook1_nunh3w.png',
        type: 'image',
        layerName: 'slideFivePhoto',
      },
      {
        src: 'https://res.cloudinary.com/hdngr/image/authenticated/s--kVjfayXi--/v1634245160/assets/184/cook1_nunh3w.png',
        type: 'image',
        layerName: 'slideSixPhoto',
      },
      {
        type: 'data',
        layerName: 'tagline',
        property: 'Text.Source Text',
        value: 'We’re Hiring!',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'position',
        property: 'Text.Source Text',
        value: '0000000000000000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'callToAction',
        property: 'Text.Source Text',
        value: 'Apply Now',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'testimonial',
        property: 'Text.Source Text',
        value:
          '000000000000000000000000000000000000000000000000000000000000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'locationTitle',
        property: 'Text.Source Text',
        value: '000000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'location',
        property: 'Text.Source Text',
        value: '0000000000000000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'slideThreeTitle',
        property: 'Text.Source Text',
        value: '0000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'slideThreeText',
        property: 'Text.Source Text',
        value:
          '000000000000000000000000000000000000000000000000000000000000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'slideFourTitle',
        property: 'Text.Source Text',
        value: '0000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'bulletPointOne',
        property: 'Text.Source Text',
        value: '000000000000000000000000000000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'bulletPointTwo',
        property: 'Text.Source Text',
        value: '000000000000000000000000000000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'bulletPointThree',
        property: 'Text.Source Text',
        value: '000000000000000000000000000000000000000000',
        composition: '_control',
      },
    ],
  },
}

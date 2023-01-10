import { IJob } from '../src/types'

import path from 'path'
const outputExt = process.platform === 'win32' ? 'avi' : 'mov'
export const T13: IJob = {
  scriptId: 13,
  aeRenderData: {
    template: {
      src: `file://${path.resolve(__dirname, '../render-templates/T13.aep')}`,
      composition: 'Main',
      outputExt,
    },
    assets: [
      {
        src:
          'https://res.cloudinary.com/hdngr/video/authenticated/s--Z4EWuUu2--/v1630074590/assets/140/Avocado_Junkie_Destination_Freedom_instrumental_2_36_jsqdry.mp3',
        type: 'audio',
        layerName: 'soundTrack',
      },
      {
        type: 'data',
        layerName: 'bgColor',
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
        type: 'data',
        layerName: 'secondaryTextColor',
        property: 'Effects.Fill.Color',
        value: [0.054901960784313725, 0.3803921568627451, 0.47058823529411764],
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'brandColor1',
        property: 'Effects.Fill.Color',
        value: [0.25882352941176473, 0.13725490196078433, 0.6588235294117647],
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'brandColor2',
        property: 'Effects.Fill.Color',
        value: [0.027450980392156862, 0.0392156862745098, 0.3333333333333333],
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'brandColor3',
        property: 'Effects.Fill.Color',
        value: [1, 0.7058823529411765, 0.9882352941176471],
        composition: '_control',
      },
      {
        src:
          'https://res.cloudinary.com/hdngr/image/authenticated/s--o2iiPScg--/v1611005055/Lumina/Color_Positive_3x_jwrvoe.png',
        type: 'image',
        layerName: 'logo',
      },
      {
        src:
          'https://res.cloudinary.com/hdngr/image/authenticated/s--jSOlwL9f--/v1633556703/assets/160/construction3_jk9kuk.png',
        type: 'image',
        layerName: 'fullSizeImg',
      },
      {
        src:
          'https://res.cloudinary.com/hdngr/image/authenticated/s--onajshKu--/v1616559061/assets/105/00089_AdobeStock_1920x1080_ysxbq3.png',
        type: 'image',
        layerName: 'imgOne',
      },
      {
        src:
          'https://res.cloudinary.com/hdngr/image/authenticated/s--kVjfayXi--/v1634245160/assets/184/cook1_nunh3w.png',
        type: 'image',
        layerName: 'coverPhoto',
      },
      {
        type: 'data',
        layerName: 'tagLine',
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
        layerName: 'testimonialName',
        property: 'Text.Source Text',
        value: '0000000000000000',
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
        layerName: 'titleOne',
        property: 'Text.Source Text',
        value: '0000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'textOne',
        property: 'Text.Source Text',
        value:
          '000000000000000000000000000000000000000000000000000000000000000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'titleTwo',
        property: 'Text.Source Text',
        value: '0000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'lineOne',
        property: 'Text.Source Text',
        value:
          '000000000000000000000000000000000000000000000000000000000000000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'lineTwo',
        property: 'Text.Source Text',
        value:
          '000000000000000000000000000000000000000000000000000000000000000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'lineThree',
        property: 'Text.Source Text',
        value:
          '000000000000000000000000000000000000000000000000000000000000000000000000000',
        composition: '_control',
      },
    ],
  },
}

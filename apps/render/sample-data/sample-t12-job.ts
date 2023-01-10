import { IJob } from '../src/types'

import path from 'path'

export const T12: IJob = {
  scriptId: 12,
  aeRenderData: {
    template: {
      src: `file://${path.resolve(__dirname, '../render-templates/T12.aep')}`,
      composition: 'Main',
      outputExt: 'mov',
    },
    assets: [
      {
        src:
          'https://res.cloudinary.com/hdngr/video/authenticated/s--Z4EWuUu2--/v1630074590/assets/140/Avocado_Junkie_Destination_Freedom_instrumental_2_36_jsqdry.mp3',
        type: 'audio',
        layerName: 'soundTrack',
      },
      {
        src:
          'https://res.cloudinary.com/hdngr/video/authenticated/s--yXOYAqFq--/v1634763914/assets/192/Bloop_small_lcpkxr.mp3',
        type: 'audio',
        layerName: 'soundEffect1',
      },
      {
        src:
          'https://res.cloudinary.com/hdngr/video/authenticated/s--UtAWlgnf--/v1634763936/assets/192/Swoosh_1_jar8mw.mp3',
        type: 'audio',
        layerName: 'soundEffect2',
      },
      {
        src:
          'https://res.cloudinary.com/hdngr/video/authenticated/s--P-90mspy--/v1634763925/assets/192/Keyboard_Typing_Slow_rzznb7.mp3',
        type: 'audio',
        layerName: 'soundEffect3',
      },
      {
        type: 'data',
        layerName: 'bgColor',
        property: 'Effects.Fill.Color',
        value: [1, 1, 1],
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
          'https://res.cloudinary.com/hdngr/image/authenticated/s--e5kNM7Gi--/v1634763851/assets/78/email_wrhd5a.png',
        type: 'image',
        layerName: 'iconEmail',
      },
      {
        src:
          'https://res.cloudinary.com/hdngr/image/authenticated/s--wnLOwOZH--/v1634763864/assets/78/phone_spdz4z.png',
        type: 'image',
        layerName: 'iconPhone',
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
        value: '000000000000000000000000',
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
        src:
          'https://res.cloudinary.com/hdngr/image/authenticated/s--lUqxLO9j--/v1616558571/assets/105/00005_AdobeStock_1920x1080_apmy6a.png',
        type: 'image',
        layerName: 'headshot',
      },
      {
        type: 'data',
        layerName: 'nameAndTitle',
        property: 'Text.Source Text',
        value: '000000000000000000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'phone',
        property: 'Text.Source Text',
        value: '0000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'email',
        property: 'Text.Source Text',
        value: '000000000000000000000000000000',
        composition: '_control',
      },
    ],
  },
}

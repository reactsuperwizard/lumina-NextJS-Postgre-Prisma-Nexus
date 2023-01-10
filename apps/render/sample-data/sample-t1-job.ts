import { IJob } from '../src/types'

import path from 'path'

const outputExt = process.platform === 'win32' ? 'avi' : 'mov'

export const T1: IJob = {
  scriptId: 3456,
  aeRenderData: {
    template: {
      src: `file://${path.resolve(__dirname, '../render-templates/T1.aep')}`,
      composition: 'Main',
      outputExt,
    },
    assets: [
      {
        src:
          'https://res.cloudinary.com/hdngr/image/authenticated/s--KniPQSIz--/v1611005082/Lumina/Color_Positive_3x_ndhoxm.png',
        type: 'image',
        layerName: 'logo',
      },
      {
        src:
          'https://res.cloudinary.com/hdngr/image/authenticated/s--Qj_SLdoQ--/v1587686734/icons/location-icon.png',
        type: 'image',
        layerName: 'iconOne',
      },
      {
        src:
          'https://res.cloudinary.com/hdngr/image/authenticated/s--YEyi0b-y--/v1587686877/icons/check-list-icon.png',
        type: 'image',
        layerName: 'iconTwo',
      },
      {
        src:
          'https://res.cloudinary.com/hdngr/video/authenticated/s--F7EFOElc--/v1613619482/assets/90/Take_Me_To_Your_Leader_Dreamlamp_instrumental_MP3_w6fr2d.mp3',
        type: 'audio',
        layerName: 'soundTrack',
      },
      {
        type: 'data',
        layerName: 'brandColor1',
        property: 'Effects.Fill.Color',
        value: [0.03529411764705882, 0.0392156862745098, 0.24705882352941178],
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'brandColor2',
        property: 'Effects.Fill.Color',
        value: [1, 1, 1],
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'brandColor3',
        property: 'Effects.Fill.Color',
        value: [0, 0, 0],
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'brandColor4',
        property: 'Effects.Fill.Color',
        value: [1, 1, 1],
        composition: '_control',
      },
      {
        src:
          'https://res.cloudinary.com/hdngr/image/authenticated/s--EF-Im3Zl--/v1600280845/adobe-stock/Business/AdobeStock_356685769_kq8m1f.jpg',
        type: 'image',
        layerName: 'backgroundImageOne',
      },
      {
        src:
          'https://res.cloudinary.com/hdngr/image/authenticated/s--iQjG6sQR--/v1612599481/assets/84/AdobeStock_1920x1080_27-Fullsized_ep2lca.png',
        type: 'image',
        layerName: 'backgroundImageTwo',
      },
      {
        src:
          'https://res.cloudinary.com/hdngr/image/authenticated/s--EF-Im3Zl--/v1600280845/adobe-stock/Business/AdobeStock_356685769_kq8m1f.jpg',
        type: 'image',
        layerName: 'backgroundImageThree',
      },
      {
        src:
          'https://res.cloudinary.com/hdngr/image/authenticated/s--iQjG6sQR--/v1612599481/assets/84/AdobeStock_1920x1080_27-Fullsized_ep2lca.png',
        type: 'image',
        layerName: 'backgroundImageFour',
      },
      {
        src:
          'https://res.cloudinary.com/hdngr/image/authenticated/s--EF-Im3Zl--/v1600280845/adobe-stock/Business/AdobeStock_356685769_kq8m1f.jpg',
        type: 'image',
        layerName: 'backgroundImageFive',
      },
      {
        type: 'data',
        layerName: 'tagLine',
        property: 'Text.Source Text',
        value: '00000000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'position',
        property: 'Text.Source Text',
        value: '0000000000000000000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'location',
        property: 'Text.Source Text',
        value: '0000000000000000000000000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'lineOne',
        property: 'Text.Source Text',
        value: '0000000000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'lineTwo',
        property: 'Text.Source Text',
        value: '0000000000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'lineThree',
        property: 'Text.Source Text',
        value: '0000000000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'lineFour',
        property: 'Text.Source Text',
        value: '0000000000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'lineFive',
        property: 'Text.Source Text',
        value: '0000000000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'lineSix',
        property: 'Text.Source Text',
        value: '0000000000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'lineSeven',
        property: 'Text.Source Text',
        value: '0000000000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'lineEight',
        property: 'Text.Source Text',
        value: '0000000000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'lineNine',
        property: 'Text.Source Text',
        value: '0000000000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'titleTwo',
        property: 'Text.Source Text',
        value: '00000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'titleThree',
        property: 'Text.Source Text',
        value: '00000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'titleFour',
        property: 'Text.Source Text',
        value: '00000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'testimonial',
        property: 'Text.Source Text',
        value: '000000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'attribution',
        property: 'Text.Source Text',
        value: '0000000000000000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'callToAction',
        property: 'Text.Source Text',
        value: '000000000',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'colorImages',
        property: 'Text.Source Text',
        value: 'false',
        composition: '_control',
      },
    ],
  },
}

const g = {
  scriptId: 235,
}

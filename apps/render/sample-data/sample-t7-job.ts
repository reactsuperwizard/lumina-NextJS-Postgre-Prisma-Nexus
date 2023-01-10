import { IJob } from '../src/types'
import path from 'path'
export const T7: IJob = {
  scriptId: 4,
  aeRenderData: {
    template: {
      src: `file://${path.resolve(__dirname, '../render-templates/T7.aep')}`,
      composition: 'Main',
      outputExt: 'mov',
      // frameStart: 0,
      // frameEnd: 90,
    },
    assets: [
      {
        src:
          'https://res.cloudinary.com/hdngr/video/authenticated/s--NdI-Ys3Y--/v1613619181/assets/89/New_Africa_10Sec_o6wqre.mov',
        type: 'audio',
        layerName: 'soundTrack',
      },
      {
        type: 'data',
        layerName: 'utilColor',
        property: 'Effects.Fill.Color',
        value: [0.00392156862745098, 0.00392156862745098, 0.26666666666666666],
        composition: '_control',
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
        value: [0.9568627450980393, 0.6745098039215687, 0.01568627450980392],
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'secondaryTextColor',
        property: 'Effects.Fill.Color',
        value: [0.5, 0.5, 0.01568627450980392],
        composition: '_control',
      },
      {
        src:
          'http://res.cloudinary.com/hdngr/image/authenticated/s--OpyprdBG--/v1609022490/public/color-positive-3x_eposia.png',
        type: 'image',
        layerName: 'logo',
      },
      {
        src:
          'https://res.cloudinary.com/hdngr/image/authenticated/s--fw2GnDvN--/v1618192715/assets/78/grunge-banner-png-3_xuve0y.png',
        type: 'image',
        layerName: 'highlighterImage',
      },
      {
        src:
          'http://res.cloudinary.com/hdngr/image/authenticated/s--Qj_SLdoQ--/v1587686734/icons/location-icon.png',
        type: 'image',
        layerName: 'icon',
      },
      {
        src:
          'https://res.cloudinary.com/hdngr/image/authenticated/s--3taq8Qgn--/v1612599432/assets/84/AdobeStock_1920x1080_20-SuperLeft_hxwhfq.png',
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
        type: 'data',
        layerName: 'tagLine',
        property: 'Text.Source Text',
        value: 'We are Hiring',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'position',
        property: 'Text.Source Text',
        value: 'Master Craftsperson',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'location',
        property: 'Text.Source Text',
        value: 'Portland, OR',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'quoteOne',
        property: 'Text.Source Text',
        value: 'Give us your colors or die!',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'quoteTwo',
        property: 'Text.Source Text',
        value: 'Pick some awesome images now',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'attributionOne',
        property: 'Text.Source Text',
        value: '-Attribution One',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'attributionTwo',
        property: 'Text.Source Text',
        value: '-Attribution Two',
        composition: '_control',
      },
    ],
  },
}

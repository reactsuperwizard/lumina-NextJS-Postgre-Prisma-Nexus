import { IJob } from '../src/types'
import path from 'path'
export const T4: IJob = {
  scriptId: 4,
  aeRenderData: {
    template: {
      src: `file://${path.resolve(
        __dirname,
        '../render-templates/T4-OneLine.aep',
      )}`,
      composition: 'Main',
      outputExt: 'mov',
      // frameStart: 0,
      // frameEnd: 90,
    },
    assets: [
      {
        src:
          'http://res.cloudinary.com/hdngr/video/authenticated/s--oyFoQNwG--/v1604797349/Audio/C_est_Bon_10Sec_xzegnd.mov',
        type: 'audio',
        layerName: 'soundTrack',
      },
      {
        type: 'data',
        layerName: 'utilColor',
        property: 'Effects.Fill.Color',
        value: [1, 1, 1],
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'bgColor',
        property: 'Effects.Fill.Color',
        value: [0.00392156862745098, 0.00392156862745098, 0.26666666666666666],
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
        type: 'data',
        layerName: 'tagLine',
        property: 'Text.Source Text',
        value: 'Next Level Recruiting For',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'position',
        property: 'Text.Source Text',
        value: 'Your Next Hire',
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
        src:
          'http://res.cloudinary.com/hdngr/image/authenticated/s--Qj_SLdoQ--/v1587686734/icons/location-icon.png',
        type: 'image',
        layerName: 'iconOne',
      },
      {
        src:
          'http://res.cloudinary.com/hdngr/image/authenticated/s--YEyi0b-y--/v1587686877/icons/check-list-icon.png',
        type: 'image',
        layerName: 'iconTwo',
      },
      {
        src:
          'http://res.cloudinary.com/hdngr/image/authenticated/s--DvWrx-mm--/v1595909338/740x1080/Lifestyle/BFVIDEO2mob2_lbppsv.jpg',
        type: 'image',
        layerName: 'backgroundImageOne',
      },
      {
        type: 'data',
        layerName: 'lineOne',
        property: 'Text.Source Text',
        value: 'Give us your colors',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'lineTwo',
        property: 'Text.Source Text',
        value: 'Pick some awesome images',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'lineThree',
        property: 'Text.Source Text',
        value: "Don't forget a soundtrack",
        composition: '_control',
      },
      {
        src:
          'http://res.cloudinary.com/hdngr/image/authenticated/s--56Ph67dn--/v1594765607/740x1080/Lifestyle/AdobeStock_170017144_1_ddzl9g.jpg',
        type: 'image',
        layerName: 'backgroundImageTwo',
      },
      {
        type: 'data',
        layerName: 'lineFour',
        property: 'Text.Source Text',
        value: 'Beautiful, engaging video',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'lineFive',
        property: 'Text.Source Text',
        value: 'Reach more candidates',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'lineSix',
        property: 'Text.Source Text',
        value: 'Tell your awesome story!',
        composition: '_control',
      },
      {
        src:
          'http://res.cloudinary.com/hdngr/image/authenticated/s--tQK6rgaO--/v1605116842/740x1080/Stock_1920x1080-4_lscjs8.png',
        type: 'image',
        layerName: 'backgroundImageThree',
      },
      {
        type: 'data',
        layerName: 'testimonial',
        property: 'Text.Source Text',
        value: '"Lumina videos are the bee\'s knees!"',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'testimonialName',
        property: 'Text.Source Text',
        value: '- Brian F., CEO Lumina',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'callToAction',
        property: 'Text.Source Text',
        value: 'Get In Touch!',
        composition: '_control',
      },
    ],
  },
}

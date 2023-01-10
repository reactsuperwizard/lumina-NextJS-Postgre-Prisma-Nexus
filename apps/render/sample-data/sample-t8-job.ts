import { IJob } from '../src/types'

import path from 'path'

export const T8: IJob = {
  scriptId: 123,
  aeRenderData: {
    template: {
      src: `file://${path.resolve(__dirname, '../render-templates/T8/T8-short.aep')}`,
      composition: 'Main',
      outputExt: 'mov',
    },
    assets: [
      {
        src:
          'https://res.cloudinary.com/hdngr/video/authenticated/s--4_oKT_lw--/v1618784994/assets/117/32_Second_Audio_Brent_Wood_b3x8in.wav',
        type: 'audio',
        layerName: 'soundTrack',
      },
      {
        type: 'data',
        layerName: 'iconColor',
        property: 'Effects.Fill.Color',
        value: [0.1803921568627451, 0.25882352941176473, 0.2901960784313726],
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'brandColor',
        property: 'Effects.Fill.Color',
        value: [0.11764705882352941, 0.7450980392156863, 0.9058823529411765],
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'backgroundColor',
        property: 'Effects.Fill.Color',
        value: [1, 1, 1],
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'primaryTextColor',
        property: 'Effects.Fill.Color',
        value: [0.1803921568627451, 0.25882352941176473, 0.2901960784313726],
        composition: '_control',
      },
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
        layerName: 'locationIcon',
      },
      {
        src:
          'https://res.cloudinary.com/hdngr/image/authenticated/s--7K8UktTf--/v1618878276/assets/78/Icon_Qualifications_yr2bfv.png',
        type: 'image',
        layerName: 'bulletIcon',
      },
      {
        src:
          'https://res.cloudinary.com/hdngr/image/authenticated/s--5-NCwynn--/v1618878257/assets/78/Icon_MissionCulture_hrp91f.png',
        type: 'image',
        layerName: 'slideTwoIcon',
      },
      {
        src:
          'https://res.cloudinary.com/hdngr/image/authenticated/s--D6BjaByL--/v1618878231/assets/78/Icon_Benefits_jzmlvo.png',
        type: 'image',
        layerName: 'slideThreeIcon',
      },
      {
        src:
          'https://res.cloudinary.com/hdngr/image/authenticated/s--y5kwCXn_--/v1618878292/assets/78/Icon_Testimonial_vpkw46.png',
        type: 'image',
        layerName: 'slideFourIcon',
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
        value: 'ABA Therapist',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'location',
        property: 'Text.Source Text',
        value: 'LOS ANGELES, CA',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'slideTwoTitle',
        property: 'Text.Source Text',
        value: 'OUR MISSION',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'slideTwoBody',
        property: 'Text.Source Text',
        value:
          'We are dedicated to serving & bettering the lives of families of children with special needs',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'slideThreeTitle',
        property: 'Text.Source Text',
        value: 'BENEFITS',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'bulletOne',
        property: 'Text.Source Text',
        value: 'Competitive salary, merit increase eligible',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'bulletTwo',
        property: 'Text.Source Text',
        value: 'Medical, dental, vision, life & disability insurance',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'bulletThree',
        property: 'Text.Source Text',
        value: 'Advancement opportunity',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'testimonial',
        property: 'Text.Source Text',
        value: 'It feels meaningful to wake up each day and make a difference!',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'attribution',
        property: 'Text.Source Text',
        value: 'EMPLOYEE REVIEW',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'callToAction',
        property: 'Text.Source Text',
        value: 'APPLY NOW',
        composition: '_control',
      },
    ],
  },
}

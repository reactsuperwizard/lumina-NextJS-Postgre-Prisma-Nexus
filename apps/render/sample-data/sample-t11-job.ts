import { IJob } from '../src/types'

import path from 'path'

export const T11: IJob = {
  scriptId: 123,
  aeRenderData: {
    template: {
      src: `file://${path.resolve(__dirname, '../render-templates/T11.aep')}`,
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
        layerName: 'brandColor1',
        property: 'Effects.Fill.Color',
        value: [1, 1, 1],
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'brandColor2',
        property: 'Effects.Fill.Color',
        value: [0.1803921568627451, 0.25882352941176473, 0.2901960784313726],
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'textColor1',
        property: 'Effects.Fill.Color',
        value: [0.1803921568627451, 0.25882352941176473, 0.2901960784313726],
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'textColor2',
        property: 'Effects.Fill.Color',
        value: [0.1803921568627451, 0.25882352941176473, 0.2901960784313726],
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'backgroundColor',
        property: 'Effects.Fill.Color',
        value: [0.11764705882352941, 0.7450980392156863, 0.9058823529411765],
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
          'https://res.cloudinary.com/hdngr/image/authenticated/s--PfR2UKKI--/v1587686801/icons/heart-icon.png',
        type: 'image',
        layerName: 'iconLogo',
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
          'https://res.cloudinary.com/hdngr/image/authenticated/s--97lkOZak--/v1616558608/assets/105/00008_AdobeStock_1920x1080_zcojgm.png',
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
          'https://res.cloudinary.com/hdngr/image/authenticated/s--0jEJo4rV--/v1616558670/assets/105/00020_AdobeStock_1920x1080_glittf.png',
        type: 'image',
        layerName: 'backgroundImageThree',
      },
      {
        src:
          'https://res.cloudinary.com/hdngr/image/authenticated/s--ZHwk95Hg--/v1616558620/assets/105/00011_AdobeStock_1920x1080_tlxhpi.png',
        type: 'image',
        layerName: 'backgroundImageFour',
      },
      {
        src:
          'https://res.cloudinary.com/hdngr/image/authenticated/s--8YLXAK5K--/v1616558656/assets/105/00018_AdobeStock_1920x1080_na1hz8.png',
        type: 'image',
        layerName: 'backgroundImageFive',
      },
      {
        type: 'data',
        layerName: 'tagline',
        property: 'Text.Source Text',
        value: 'Palomar Health',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'position',
        property: 'Text.Source Text',
        value: 'Vice President, District Perioperative Services',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'location',
        property: 'Text.Source Text',
        value: 'Escondido, CA',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'slideTwoTitle',
        property: 'Text.Source Text',
        value: 'Palomar Health',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'bulletOne',
        property: 'Text.Source Text',
        value: 'Multi-site totaling 16 ORs',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'bulletTwo',
        property: 'Text.Source Text',
        value: 'Reports to system Chief Medical Officer',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'bulletThree',
        property: 'Text.Source Text',
        value: '3 direct reports and 300 full-time employees',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'slideThreeTitle',
        property: 'Text.Source Text',
        value: 'Palomar Health',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'slideThreeBody',
        property: 'Text.Source Text',
        value:
          'Palomar Health is recognized nationally for the highest quality of clinical care and technology.',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'slideFourTitle',
        property: 'Text.Source Text',
        value: 'Escondido, CA',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'slideFourBody',
        property: 'Text.Source Text',
        value:
          'Founded in 188, Escondido is one of the oldest cities in San Diego County & tends to have warm summers with cool, wet winters.',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'name',
        property: 'Text.Source Text',
        value: 'Kent Van Vleet',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'email',
        property: 'Text.Source Text',
        value: 'kent.vanvleet@whitmanpartners.com',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'phone',
        property: 'Text.Source Text',
        value: '503-956-1248',
        composition: '_control',
      },
      {
        type: 'data',
        layerName: 'showContact',
        property: 'Text.Source Text',
        value: 'true',
        composition: '_control',
      },
    ],
  },
}

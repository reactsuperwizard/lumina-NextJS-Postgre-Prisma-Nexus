import { useMemo } from 'react'
import { Layer, Layers } from '@lumina/render/src/Script/Script'
import { Bullets, Feedback } from '.'
import { Type3 } from '../types/Type3'
import { Type2 } from '../types/Type2'
import { Flavor } from '@lumina/render/src/flavors'
import { Type4 } from '../types/Type4'
import { Type8 } from '../types/Type8-T8'
import { Type7 } from '../types/Type7-T8'
import { Intro3 } from '../types/Intro3'
import { Outro1 } from '../types/Outro1'
import { TitleAndText } from '../types/TitleAndText'

export interface LayerArray {
  layerName: string
  layer: Layer
}
const SlideTypeMatcher = ({
  slides: allSlides,
  layers: allLayers,
  currentSlideIndex,
  flavorData,
}: {
  slides: string[][] | undefined
  layers: Layers | undefined
  currentSlideIndex: number
  flavorData: Flavor
}) => {
  const slideData = useMemo(() => {
    const layerNames = flavorData.slides![currentSlideIndex]
    const firstLayerName: string = layerNames[0]
    const firstLayer = flavorData.layers![firstLayerName]
    const layers: LayerArray[] = layerNames
      // .slice(1, layerNames.length)
      .map((layerName: string) => {
        return { layerName, layer: allLayers![layerName] }
      })
    return { slideType: firstLayer!.slideType, layers }
  }, [currentSlideIndex, allSlides, allLayers])

  const getIconLayerRightArc = () => {
    if (currentSlideIndex == 1) return allLayers?.slideTwoIcon!
    else if (currentSlideIndex == 2) return allLayers?.slideThreeIcon
    else if (currentSlideIndex == 3) return allLayers?.slideFourIcon
  }
  const { slideType, layers } = slideData
  if (slideType === 'right-arc-title')
    return (
      <Type8
        backgroundColor={allLayers?.backgroundColor!}
        iconLayer={getIconLayerRightArc()!}
        brandColorLayer={allLayers?.brandColor!}
      >
        <TitleAndText
          titleLayer={{ ...allLayers?.slideTwoTitle!, name: 'slideTwoTitle' }}
          descriptionLayer={{
            ...allLayers?.slideTwoBody!,
            name: 'slideTwoBody',
          }}
          titleColorLayer={allLayers?.brandColor!}
          descriptionColorLayer={allLayers?.primaryTextColor!}
        ></TitleAndText>
      </Type8>
    )

  if (slideType === 'right-arc-bullets')
    return (
      <Type8
        backgroundColor={allLayers?.backgroundColor!}
        iconLayer={getIconLayerRightArc()!}
        brandColorLayer={allLayers?.brandColor!}
      >
        <Bullets
          flex={3}
          textColorLayer={allLayers!.primaryTextColor}
          titleColorLayer={allLayers!.brandColor}
          bulletsLayer={allLayers!.bulletIcon}
          backgroundColor="transparent"
          colorMode="blue"
          bulletTextSize="lg"
          bulletSize={30}
          withTitle
          layers={layers.slice(0, layers.length - 1)}
        />
      </Type8>
    )

  if (slideType === 'right-arc-testimonial')
    return (
      <Type8
        backgroundColor={allLayers?.backgroundColor!}
        iconLayer={getIconLayerRightArc()!}
        brandColorLayer={allLayers?.brandColor!}
      >
        <Feedback
          feedbackLayer={{ ...allLayers?.testimonial!, name: 'testimonial' }}
          feedbackColorLayer={allLayers?.primaryTextColor!}
          authorColorLayer={allLayers?.brandColor!}
          authorLayer={{ ...allLayers?.attribution!, name: 'attribution' }}
        />
      </Type8>
    )

  if (slideType === 'top-arc-intro')
    return (
      <Type7
        logoLayer={allLayers?.logo!}
        backgroundColor={allLayers?.backgroundColor!}
        brandColorLayer={allLayers?.brandColor!}
      >
        <Intro3
          locationIconLayer={allLayers?.locationIcon!}
          locationLayer={{ ...allLayers?.location!, name: 'location' }}
          tagLayer={{ ...allLayers?.tagline!, name: 'tagline' }}
          postionLayer={{ ...allLayers?.position!, name: 'position' }}
        />
      </Type7>
    )

  if (slideType === 'top-arc-cta')
    return (
      <Type7
        logoLayer={allLayers?.logo!}
        backgroundColor={allLayers?.backgroundColor!}
        brandColorLayer={allLayers?.brandColor!}
      >
        <Outro1
          ctaLayer={{ ...allLayers?.callToAction!, name: 'callToAction' }}
        />
      </Type7>
    )

  if (slideType === 'middle-box')
    return (
      <Type4
        showBottom={false}
        gradientBorder={true}
        backgroundLayer={allLayers?.backgroundImageFive!}
        textColorLayer={allLayers?.brandColor4!}
        descriptionColorLayer={allLayers?.brandColor3!}
        boxColorLayer={allLayers?.brandColor1!}
        headingLayer={allLayers?.titleFive!}
        descriptionLayer={allLayers?.bodyFive!}
      />
    )

  if (slideType === 'middle-row')
    return (
      <Type2
        layers={layers}
        brandLayer={allLayers!['brandColor1']}
        locationLayer={allLayers!['iconOne']}
        logoLayer={allLayers!['logo']}
      />
    )
  if (slideType === 'left50-gradient')
    return (
      <Type3 imagePosition="left" gradientMode="white" layers={layers}>
        <Bullets
          flex={3}
          textColorLayer={allLayers!['brandColor3']}
          titleColorLayer={allLayers!['brandColor3']}
          bulletsLayer={allLayers!['iconTwo']}
          backgroundColor="transparent"
          colorMode="blue"
          withTitle
          layers={layers.slice(1, layers.length)}
        />
      </Type3>
    )

  if (slideType === 'left50-testimonial')
    return (
      <Type3 imagePosition="left" gradientMode="white" layers={layers}>
        <Feedback
          feedbackLayer={{ ...allLayers?.testimonial!, name: 'testimonial' }}
          feedbackColorLayer={allLayers?.brandColor4!}
          authorColorLayer={allLayers?.brandColor4!}
          authorLayer={{ ...allLayers?.attribution!, name: 'attribution' }}
        />
      </Type3>
    )

  return <></>
}

export default SlideTypeMatcher

//   ==== T1:Slid1 ====
//   <Type3 gradientMode="blue">
//      <Feedback flex={2} backgroundColor="transparent" colorMode="blue" placeholders={['Review', 'From']} />
//   </Type3>

//   ==== T4:Slid4 ====
//   <Type3 imagePosition="right">
//      <Feedback flex={3} backgroundColor="#fdfffcf0" colorMode="blue" placeholders={['Review', 'From']} />
//   </Type3>

//   ==== T6:Slid4 ====
//   <Type3 imagePosition="right">
//      <Bullets flex={2} backgroundColor="#fdfffc" colorMode="blue" withTitle/>
//   </Type3>

//   ==== T6:Slid3 ====
//   <Type3 imagePosition="left">
//      <Bullets flex={2} backgroundColor="#fdfffc" colorMode="blue" withTitle/>
//   </Type3>

//   ==== T2:Slid3 ====
//   <Type3 imagePosition="left">
//     <Bullets flex={3} backgroundColor="#fdfffc" colorMode="blue" />
//   </Type3>

//   ==== T1:Slid3(T2:Slide3), T1:Slid4(T2:Slide4), T1:Slid5(T2:Slide5), ====
//   <Type3 imagePosition="left" gradientMode="white">
//     <Bullets
//       flex={3}
//       backgroundColor="transparent"
//       colorMode="blue"
//       withTitle
//     />
//   </Type3>

//  ==== T4:Slide2 ====
//   <Type3 imagePosition="right">
//     <Bullets flex={3} backgroundColor="#fdfffc" colorMode="blue">
//       <Logo darkBackground={true}></Logo>
//     </Bullets>
//   </Type3>

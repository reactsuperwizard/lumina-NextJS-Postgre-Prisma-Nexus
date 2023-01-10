import { useState } from 'react'

import { Events, VideoEventParams } from './Events'

export const useEvents = (events: Events | undefined) => {
  const { onLoad, onStart, on25Percent, on50Percent, on75Percent, onComplete } =
    events || {}

  // set progress at interval
  const [progress25, setProgress25] = useState(false)
  const [progress50, setProgress50] = useState(false)
  const [progress75, setProgress75] = useState(false)
  const [complete, setComplete] = useState(false)

  const doOnLoad = (args: VideoEventParams) => {
    onLoad && onLoad(args)
    console.info('Video loaded')
  }

  const doOnStart = (args: VideoEventParams) => {
    onStart && onStart(args)
    console.info('Video started')
  }

  const doOn25Percent = (args: VideoEventParams) => {
    on25Percent && on25Percent(args)
    console.info('Progress 25')
  }

  const doOn50Percent = (args: VideoEventParams) => {
    on50Percent && on50Percent(args)
    console.info('Progress 50')
  }

  const doOn75Percent = (args: VideoEventParams) => {
    on75Percent && on75Percent(args)
    console.info('Progress 75')
  }

  const doOnComplete = (args: VideoEventParams) => {
    onComplete && onComplete(args)
    console.info('Progress 95 and video complete')
  }

  const doOnProgress = (args: VideoEventParams) => {
    const progress = args.progress as number
    if (progress >= 95 && !complete) {
      setComplete(true)
      doOnComplete(args)
      return
    }
    if (progress >= 75 && !progress75) {
      setProgress75(true)
      doOn75Percent(args)
      return
    }
    if (progress >= 50 && !progress50) {
      setProgress50(true)
      doOn50Percent(args)
      return
    }
    if (progress >= 25 && !progress25) {
      setProgress25(true)
      doOn25Percent(args)
      return
    }
  }

  return {
    onLoad: doOnLoad,
    onStart: doOnStart,
    onProgress: doOnProgress,
  }
}

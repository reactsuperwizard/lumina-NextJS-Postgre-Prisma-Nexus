import React from 'react'

import { useRouter } from 'next/router'

import Player from 'modules/Player'
import { useGa } from 'modules/GA/useGa'
import { VideoEventParams } from 'modules/Player/events'
import { usePlausible } from 'modules/Plausible'
import { EventNames } from 'modules/Plausible'

const PlayerPage = () => {
  const router = useRouter()

  const { pageView, videoStart, videoProgress, videoComplete } = useGa()
  const { videoEvent } = usePlausible()
  const { vimeoId, autoplay } = router.query
  if (vimeoId) {
    return (
      <Player
        autoplay={`${autoplay}`.toLowerCase() === 'true'}
        events={{
          onLoad: () => {
            videoEvent(EventNames.VIDEO_LOAD, {
              props: {
                videoProvider: 'Vimeo',
                vimeoId: vimeoId as string,
                videoUrl: window.location.pathname,
              },
            })
            pageView()
          },
          onStart: (args: VideoEventParams) => {
            const { videoCurrentTime, videoDuration, progress } = args
            videoEvent(EventNames.VIDEO_START, {
              props: {
                videoDuration,
                videoCurrentTime,
                videoPercentComplete: progress,
                videoProvider: 'Vimeo',
                vimeoId: vimeoId as string,
                videoUrl: window.location.pathname,
              },
            })
            videoStart(args)
          },
          on25Percent: (args: VideoEventParams) => {
            const { videoCurrentTime, videoDuration, progress } = args
            videoEvent(EventNames.VIDEO_25, {
              props: {
                videoDuration,
                videoCurrentTime,
                videoPercentComplete: progress,
                videoProvider: 'Vimeo',
                vimeoId: vimeoId as string,
                videoUrl: window.location.pathname,
              },
            })
            videoProgress(args)
          },
          on50Percent: (args: VideoEventParams) => {
            const { videoCurrentTime, videoDuration, progress } = args
            videoEvent(EventNames.VIDEO_50, {
              props: {
                videoDuration,
                videoCurrentTime,
                videoPercentComplete: progress,
                videoProvider: 'Vimeo',
                vimeoId: vimeoId as string,
                videoUrl: window.location.pathname,
              },
            })
            videoProgress(args)
          },
          on75Percent: (args: VideoEventParams) => {
            const { videoCurrentTime, videoDuration, progress } = args
            videoEvent(EventNames.VIDEO_75, {
              props: {
                videoDuration,
                videoCurrentTime,
                videoPercentComplete: progress,
                videoProvider: 'Vimeo',
                vimeoId: vimeoId as string,
                videoUrl: window.location.pathname,
              },
            })
            videoProgress(args)
          },
          onComplete: (args: VideoEventParams) => {
            const { videoCurrentTime, videoDuration, progress } = args
            videoEvent(EventNames.VIDEO_COMPLETE, {
              props: {
                videoDuration,
                videoCurrentTime,
                videoPercentComplete: progress,
                videoProvider: 'Vimeo',
                vimeoId: vimeoId as string,
                videoUrl: window.location.pathname,
              },
            })
            videoComplete(args)
          },
        }}
        poweredBy={{
          logoSrc: '/Negative@3x.png',
          iconSrc: '/Negative@3xIcon.png',
          href: 'https://www.lumina.co',
        }}
        vimeoId={+vimeoId}
      />
    )
  }
  return null
}

export default PlayerPage

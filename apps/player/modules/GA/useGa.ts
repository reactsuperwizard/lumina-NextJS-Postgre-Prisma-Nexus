import { VideoEventParams } from './Events'
import { VideoEventParams as VideoPlayerEventParams } from 'modules/Player/events/Events'

export const useGa = () => {
  const _createPayload = (args: VideoPlayerEventParams): VideoEventParams => {
    const payload: VideoEventParams = {
      video_title: args.videoTitle,
      video_url: args.videoUrl,
      video_provider: args.videoProvider,
      video_percent: args.progress,
      video_duration: args.videoDuration,
      video_current_time: args.videoCurrentTime,
    }
    return payload
  }

  const pageView = () => {
    let page_referrer
    if (window.location !== window.parent.location) {
      page_referrer = document.referrer
    }
    try {
      window.gtag('event', 'page_view', {
        page_location: window.location.href,
        page_referrer,
      })
    } catch (e) {
      console.info(e)
    }
  }

  const videoStart = (args: VideoPlayerEventParams) => {
    const payload = _createPayload(args)
    try {
      window.gtag('event', 'video_start', payload)
    } catch (e) {
      console.info(e)
    }
  }

  const videoProgress = (args: VideoPlayerEventParams) => {
    const payload = _createPayload(args)
    try {
      window.gtag('event', 'video_progress', payload)
    } catch (e) {
      console.info(e)
    }
  }

  const videoComplete = (args: VideoPlayerEventParams) => {
    const payload = _createPayload(args)
    try {
      window.gtag('event', 'video_complete', payload)
    } catch (e) {
      console.info(e)
    }
  }

  return { pageView, videoStart, videoProgress, videoComplete }
}

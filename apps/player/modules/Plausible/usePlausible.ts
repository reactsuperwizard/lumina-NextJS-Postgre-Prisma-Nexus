// export const usePlausible = () => useContext(PlausibleContext)!
import { EventNames } from './Constants'

type VideoEvent = (
  eventName: EventNames,
  rest: {
    props: {
      videoPercentComplete?: number
      videoProvider: 'Vimeo'
      vimeoId: string
      videoDuration?: number
      videoCurrentTime?: number
      videoUrl: string
    }
  },
) => void

export const usePlausible = () => {
  const videoEvent: VideoEvent = (eventName, rest) => {
    ;(window as any).plausible?.(eventName, rest)
  }
  return {
    videoEvent,
  }
}

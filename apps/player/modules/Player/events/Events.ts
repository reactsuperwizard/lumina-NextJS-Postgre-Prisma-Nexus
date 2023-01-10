export interface VideoEventParams {
  videoTitle: string
  videoUrl: string
  videoProvider: string // 'vimeo' | future...
  videoDuration: number // in seconds
  progress?: number // 0-100
  videoCurrentTime?: number // in seconds
}

export interface Events {
  onLoad?: (args: VideoEventParams) => void // fired when page loads
  onStart?: (args: VideoEventParams) => void // fired when video starts
  on25Percent?: (args: VideoEventParams) => void // fired when video reaches 25 percent complete
  on50Percent?: (args: VideoEventParams) => void // fired when video reaches 50 percent complete
  on75Percent?: (args: VideoEventParams) => void // fired when video reaches 75 percent complete
  onComplete?: (args: VideoEventParams) => void // fired when video reaches 95 percent complete, we consider this as a full view
}

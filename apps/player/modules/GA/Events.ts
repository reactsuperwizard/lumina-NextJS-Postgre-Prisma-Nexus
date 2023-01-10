// https://support.google.com/analytics/answer/9216061
export interface VideoEventParams {
  video_title: string
  video_url: string
  video_provider: string
  video_duration: number // in seconds
  video_percent?: number // 0-100
  video_current_time?: number // in seconds
}

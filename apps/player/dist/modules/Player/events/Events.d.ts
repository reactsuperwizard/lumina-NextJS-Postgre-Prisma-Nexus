export interface VideoEventParams {
    videoTitle: string;
    videoUrl: string;
    videoProvider: string;
    videoDuration: number;
    progress?: number;
    videoCurrentTime?: number;
}
export interface Events {
    onLoad?: (args: VideoEventParams) => void;
    onStart?: (args: VideoEventParams) => void;
    on25Percent?: (args: VideoEventParams) => void;
    on50Percent?: (args: VideoEventParams) => void;
    on75Percent?: (args: VideoEventParams) => void;
    onComplete?: (args: VideoEventParams) => void;
}

import { Events, VideoEventParams } from './Events';
export declare const useEvents: (events: Events | undefined) => {
    onLoad: (args: VideoEventParams) => void;
    onStart: (args: VideoEventParams) => void;
    onProgress: (args: VideoEventParams) => void;
};

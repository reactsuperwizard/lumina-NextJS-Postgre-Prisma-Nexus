import React from 'react';
import VimeoPlayer from 'react-player/vimeo';
interface Props {
    background: string;
    progress: number;
    buffer: number;
    doShowToolbar: () => void;
    seekTo: VimeoPlayer['seekTo'];
    playing: boolean;
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
}
export declare const ProgressBar: ({ playing, progress, buffer, background, seekTo, setPlaying, setProgress, }: Props) => JSX.Element;
export {};

/// <reference types="react" />
interface Props {
    playing: boolean;
    doPause: () => void;
    doPlay: () => void;
}
export declare const PlayControl: ({ doPlay, doPause, playing }: Props) => JSX.Element;
export {};

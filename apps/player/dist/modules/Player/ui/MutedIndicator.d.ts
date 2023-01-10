/// <reference types="react" />
interface Props {
    toolbarShowing: boolean;
    started: boolean;
    volume: number;
    background: string;
}
export declare const MutedIndicator: ({ toolbarShowing, volume, started, background, }: Props) => JSX.Element;
export {};

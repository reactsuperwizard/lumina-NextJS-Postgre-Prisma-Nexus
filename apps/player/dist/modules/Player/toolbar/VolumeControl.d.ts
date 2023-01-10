/// <reference types="react" />
interface Props {
    doShowToolbar: () => void;
    doAdjustVolume: (value: number) => void;
    doToggleVolume: () => void;
    volume: number;
}
export declare const VolumeControl: ({ doAdjustVolume, doToggleVolume, doShowToolbar, volume, }: Props) => JSX.Element;
export {};

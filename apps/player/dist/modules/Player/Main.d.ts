/// <reference types="react" />
import { Events } from './events';
interface Props {
    vimeoId: number;
    autoplay?: boolean;
    poweredBy?: {
        href: string;
        logoSrc: string;
        iconSrc: string;
    };
    previewOnly?: boolean;
    onClick?: () => void;
    responsive?: boolean;
    getEmbedCode?: (embedCode: string) => void;
    events?: Events;
    getCurrentTime?: (currentTime: number) => void;
}
export declare const Main: ({ responsive, autoplay, vimeoId, poweredBy, onClick: onClickOverride, previewOnly, getEmbedCode, events, getCurrentTime, }: Props) => JSX.Element | null;
export {};

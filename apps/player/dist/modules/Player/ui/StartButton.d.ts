import React from 'react';
interface Props {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    started: boolean;
}
export declare const StartButton: ({ onClick, started, }: Props) => JSX.Element;
export {};

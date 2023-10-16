import type { Plugin } from 'vite';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';
type Options = Parameters<typeof createSvgSpritePlugin>[0];
export declare class SvgSpriteIcon {
    #private;
    path: string;
    group: string;
    name: string;
    fileName: string;
    constructor(path: string);
}
export declare const svgSpritePlugin: (options?: Options) => Plugin;
export {};

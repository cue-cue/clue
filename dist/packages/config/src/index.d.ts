/// <reference types="svelte" />
interface IConfigData {
    prefix: string;
    customClassNames: string[];
    transition: {
        delay: number;
        duration: number;
    };
}
export declare const config: {
    subscribe: (this: void, run: import("svelte/store").Subscriber<IConfigData>, invalidate?: import("svelte/store").Invalidator<IConfigData> | undefined) => import("svelte/store").Unsubscriber;
    setCustomClassNames: (customClassNames: IConfigData['customClassNames']) => void;
    setTransition: (transition: Partial<IConfigData['transition']>) => void;
};
export {};

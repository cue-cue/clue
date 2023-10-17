import { Trigger } from ".";
export interface IHoverTriggerOptions {
    delay: [number, number] | number;
}
export declare class HoverTrigger extends Trigger {
    options: IHoverTriggerOptions | undefined;
    constructor(elements: Trigger['elements'], events: Trigger['events'], options?: IHoverTriggerOptions);
    openWithDelayTimeout?: ReturnType<typeof setTimeout>;
    openWithDelay(): void;
    closeWithDelayTimeout?: ReturnType<typeof setTimeout>;
    closeWithDelay(): void;
    getDelay(): {
        open: number;
        close: number;
    };
}

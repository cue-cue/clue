import { type ComputeConfig } from "svelte-floating-ui";
import type { ActionReturn } from "svelte/action";
import { type Trigger } from "../Trigger/index.js";
export type PopoverEvents = {
    [K in keyof HTMLElementEventMap]: (event: HTMLElementEventMap[K]) => void;
};
export interface IPopoverTargetOrContentTriggers {
    init: (node: HTMLElement) => void;
    destroy: () => void;
}
export interface IPopoverOptions extends ComputeConfig {
    target?: Partial<IPopoverTargetOrContentTriggers>;
    content?: Partial<IPopoverTargetOrContentTriggers>;
    trigger?: Trigger | Trigger[];
}
export declare const createPopoverActions: (options: IPopoverOptions) => {
    targetAction: (node: HTMLElement) => ActionReturn;
    contentAction: (node: HTMLElement) => ActionReturn;
    update: import("svelte-floating-ui").UpdatePosition;
};

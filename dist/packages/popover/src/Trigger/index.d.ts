import type { Writable } from "svelte/store";
import type { PopoverEvents } from "../actions";
export declare class Trigger {
    handlers: {
        target?: Partial<PopoverEvents>;
        content?: Partial<PopoverEvents>;
    };
    elements: Record<"target" | "content", Writable<HTMLElement | undefined>>;
    events: {
        open?: VoidFunction | undefined;
        close?: VoidFunction | undefined;
    };
    constructor(elements: Record<'target' | 'content', Writable<HTMLElement | undefined>>, events: {
        open?: VoidFunction;
        close?: VoidFunction;
    });
    setHandlers(handlers: Trigger['handlers']): void;
    open(): void;
    close(): void;
}
export declare class TriggerCombinator {
    trigger: Trigger[];
    handlers: Trigger['handlers'];
    constructor(trigger: Trigger | Trigger[]);
    createHandlers(trigger?: Trigger[]): TriggerCombinator['handlers'];
}

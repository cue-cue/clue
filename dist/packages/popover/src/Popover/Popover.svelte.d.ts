import { SvelteComponent } from "svelte";
import type { ComputeConfig } from 'svelte-floating-ui';
import { type OffsetOptions } from 'svelte-floating-ui/core';
declare const __propDef: {
    props: {
        setOpen?: ((_open: boolean | undefined) => void) | undefined;
        toggle?: (() => void) | undefined;
    } & {
        /**
         * @default true
         */
        inline?: boolean | undefined;
        /**
         * @default 'top'
         */
        placement?: ComputeConfig['placement'];
        /**
         * @default 0
         */
        offset?: OffsetOptions | undefined;
        /**
         * @default false
         */
        open?: boolean | undefined;
        /**
         * @default 'hover'
         */
        trigger?: false | "hover" | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            targetAction: (node: HTMLElement) => import("svelte/action").ActionReturn<undefined, Record<never, any>>;
            update: import("svelte-floating-ui").UpdatePosition;
        };
        'content-wrapper': {
            contentAction: (node: HTMLElement) => import("svelte/action").ActionReturn<undefined, Record<never, any>>;
            update: import("svelte-floating-ui").UpdatePosition;
            open: boolean | undefined;
        };
        content: {};
    };
};
export type PopoverProps = typeof __propDef.props;
export type PopoverEvents = typeof __propDef.events;
export type PopoverSlots = typeof __propDef.slots;
export default class Popover extends SvelteComponent<PopoverProps, PopoverEvents, PopoverSlots> {
    get setOpen(): (_open: boolean | undefined) => void;
    get toggle(): () => void;
}
export {};

import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        class?: string | undefined;
        popoverAction?: ((node: HTMLElement) => import("svelte/action").ActionReturn<undefined, Record<never, any>>) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type PopoverContentProps = typeof __propDef.props;
export type PopoverContentEvents = typeof __propDef.events;
export type PopoverContentSlots = typeof __propDef.slots;
export default class PopoverContent extends SvelteComponent<PopoverContentProps, PopoverContentEvents, PopoverContentSlots> {
}
export {};

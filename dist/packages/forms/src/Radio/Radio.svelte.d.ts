import { SvelteComponent } from "svelte";
import type LabelName from '../Label/LabelName.svelte';
declare const __propDef: {
    props: Omit<Omit<import("svelte/elements.js").HTMLInputAttributes, "type" | "checked"> & {
        class?: string | undefined;
        group?: string | number | undefined;
        id?: string | undefined;
    }, "value" | "group"> & {
        class?: string | undefined;
        group?: string | number | undefined;
        value?: any;
    } & {
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            label: typeof LabelName;
        };
        desc: {};
    };
};
export type RadioProps = typeof __propDef.props;
export type RadioEvents = typeof __propDef.events;
export type RadioSlots = typeof __propDef.slots;
export default class Radio extends SvelteComponent<RadioProps, RadioEvents, RadioSlots> {
}
export {};

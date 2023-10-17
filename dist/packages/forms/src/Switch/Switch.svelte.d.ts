import { SvelteComponent } from "svelte";
import type LabelName from '../Label/LabelName.svelte';
declare const __propDef: {
    props: Omit<Omit<import("svelte/elements.js").HTMLInputAttributes, "value" | "type"> & {
        class?: string | undefined;
        id?: string | undefined;
        type?: "radio" | "checkbox" | undefined;
        group: (string | number)[];
        value: string;
        manual?: boolean | undefined;
    }, "value" | "group"> & {
        class?: string | undefined;
        group?: (string | number)[] | undefined;
        value?: string | undefined;
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
export type SwitchProps = typeof __propDef.props;
export type SwitchEvents = typeof __propDef.events;
export type SwitchSlots = typeof __propDef.slots;
export default class Switch extends SvelteComponent<SwitchProps, SwitchEvents, SwitchSlots> {
}
export {};

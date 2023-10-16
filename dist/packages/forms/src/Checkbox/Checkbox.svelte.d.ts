import { SvelteComponent } from "svelte";
import { Label } from '../Label/index.js';
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
            Label: typeof LabelName;
        };
        desc: {};
    };
};
export type CheckboxProps = typeof __propDef.props;
export type CheckboxEvents = typeof __propDef.events;
export type CheckboxSlots = typeof __propDef.slots;
export default class Checkbox extends SvelteComponent<CheckboxProps, CheckboxEvents, CheckboxSlots> {
}
export {};

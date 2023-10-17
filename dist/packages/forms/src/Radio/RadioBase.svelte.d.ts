import { SvelteComponent } from "svelte";
import type { ComponentProps } from 'svelte';
import InputRadio from '../Input/InputRadio.svelte';
declare const __propDef: {
    props: Omit<Omit<import("svelte/elements").HTMLInputAttributes, "type" | "checked"> & {
        class?: string | undefined;
        group?: string | number | undefined;
        id?: string | undefined;
    }, "value" | "group"> & {
        class?: string | undefined;
        group?: ComponentProps<InputRadio>['group'];
        value?: ComponentProps<InputRadio>['value'];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type RadioBaseProps = typeof __propDef.props;
export type RadioBaseEvents = typeof __propDef.events;
export type RadioBaseSlots = typeof __propDef.slots;
export default class RadioBase extends SvelteComponent<RadioBaseProps, RadioBaseEvents, RadioBaseSlots> {
}
export {};

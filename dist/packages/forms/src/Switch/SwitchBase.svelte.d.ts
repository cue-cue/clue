import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: Omit<Omit<import("svelte/elements").HTMLInputAttributes, "value" | "type"> & {
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
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SwitchBaseProps = typeof __propDef.props;
export type SwitchBaseEvents = typeof __propDef.events;
export type SwitchBaseSlots = typeof __propDef.slots;
export default class SwitchBase extends SvelteComponent<SwitchBaseProps, SwitchBaseEvents, SwitchBaseSlots> {
}
export {};

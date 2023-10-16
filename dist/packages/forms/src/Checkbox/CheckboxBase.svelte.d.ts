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
export type CheckboxBaseProps = typeof __propDef.props;
export type CheckboxBaseEvents = typeof __propDef.events;
export type CheckboxBaseSlots = typeof __propDef.slots;
export default class CheckboxBase extends SvelteComponent<CheckboxBaseProps, CheckboxBaseEvents, CheckboxBaseSlots> {
}
export {};

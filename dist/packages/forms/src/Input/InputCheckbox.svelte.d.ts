import { SvelteComponent } from "svelte";
import type { HTMLInputAttributes } from 'svelte/elements';
declare const __propDef: {
    props: Omit<HTMLInputAttributes, "value" | "type"> & {
        class?: string | undefined;
        id?: string | undefined;
        type?: "radio" | "checkbox" | undefined;
        group: (string | number)[];
        value: string;
        manual?: boolean | undefined;
    };
    events: {
        keyup: KeyboardEvent;
        keydown: KeyboardEvent;
        keypress: KeyboardEvent;
        focus: FocusEvent;
        blur: FocusEvent;
        click: MouseEvent;
        mouseover: MouseEvent;
        mouseenter: MouseEvent;
        mouseleave: MouseEvent;
        paste: ClipboardEvent;
        change: Event;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type InputCheckboxProps = typeof __propDef.props;
export type InputCheckboxEvents = typeof __propDef.events;
export type InputCheckboxSlots = typeof __propDef.slots;
export default class InputCheckbox extends SvelteComponent<InputCheckboxProps, InputCheckboxEvents, InputCheckboxSlots> {
}
export {};

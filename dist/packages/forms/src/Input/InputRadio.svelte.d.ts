import { SvelteComponent } from "svelte";
import type { HTMLInputAttributes } from 'svelte/elements';
declare const __propDef: {
    props: Omit<HTMLInputAttributes, "type" | "checked"> & {
        class?: string | undefined;
        group?: string | number | undefined;
        id?: string | undefined;
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
export type InputRadioProps = typeof __propDef.props;
export type InputRadioEvents = typeof __propDef.events;
export type InputRadioSlots = typeof __propDef.slots;
export default class InputRadio extends SvelteComponent<InputRadioProps, InputRadioEvents, InputRadioSlots> {
}
export {};

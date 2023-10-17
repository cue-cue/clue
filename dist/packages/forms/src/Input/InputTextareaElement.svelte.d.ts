import { SvelteComponent } from "svelte";
import type { HTMLTextareaAttributes } from 'svelte/elements';
declare const __propDef: {
    props: HTMLTextareaAttributes & {
        class?: string | undefined;
        nodeElement?: HTMLElement | undefined;
        id?: string | undefined;
    };
    events: {
        input: Event;
        change: Event;
        keydown: KeyboardEvent;
        keyup: KeyboardEvent;
        click: MouseEvent;
        focus: FocusEvent;
        blur: FocusEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type InputTextareaElementProps = typeof __propDef.props;
export type InputTextareaElementEvents = typeof __propDef.events;
export type InputTextareaElementSlots = typeof __propDef.slots;
export default class InputTextareaElement extends SvelteComponent<InputTextareaElementProps, InputTextareaElementEvents, InputTextareaElementSlots> {
}
export {};

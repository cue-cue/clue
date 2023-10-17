import { SvelteComponent } from "svelte";
import type { HTMLLabelAttributes } from 'svelte/elements';
declare const __propDef: {
    props: HTMLLabelAttributes & {
        class?: string | undefined;
        color?: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type TextFieldLabelProps = typeof __propDef.props;
export type TextFieldLabelEvents = typeof __propDef.events;
export type TextFieldLabelSlots = typeof __propDef.slots;
export default class TextFieldLabel extends SvelteComponent<TextFieldLabelProps, TextFieldLabelEvents, TextFieldLabelSlots> {
}
export {};

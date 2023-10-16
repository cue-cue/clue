import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type TextFieldValueProps = typeof __propDef.props;
export type TextFieldValueEvents = typeof __propDef.events;
export type TextFieldValueSlots = typeof __propDef.slots;
export default class TextFieldValue extends SvelteComponent<TextFieldValueProps, TextFieldValueEvents, TextFieldValueSlots> {
}
export {};

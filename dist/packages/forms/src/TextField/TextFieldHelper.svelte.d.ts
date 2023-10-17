import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        class?: string | undefined;
        error?: boolean | undefined;
        disabled?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type TextFieldHelperProps = typeof __propDef.props;
export type TextFieldHelperEvents = typeof __propDef.events;
export type TextFieldHelperSlots = typeof __propDef.slots;
export default class TextFieldHelper extends SvelteComponent<TextFieldHelperProps, TextFieldHelperEvents, TextFieldHelperSlots> {
}
export {};

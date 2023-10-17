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
export type TextFieldHeaderProps = typeof __propDef.props;
export type TextFieldHeaderEvents = typeof __propDef.events;
export type TextFieldHeaderSlots = typeof __propDef.slots;
export default class TextFieldHeader extends SvelteComponent<TextFieldHeaderProps, TextFieldHeaderEvents, TextFieldHeaderSlots> {
}
export {};

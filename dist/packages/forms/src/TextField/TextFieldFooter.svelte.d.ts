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
export type TextFieldFooterProps = typeof __propDef.props;
export type TextFieldFooterEvents = typeof __propDef.events;
export type TextFieldFooterSlots = typeof __propDef.slots;
export default class TextFieldFooter extends SvelteComponent<TextFieldFooterProps, TextFieldFooterEvents, TextFieldFooterSlots> {
}
export {};

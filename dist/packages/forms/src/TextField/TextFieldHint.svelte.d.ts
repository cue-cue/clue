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
export type TextFieldHintProps = typeof __propDef.props;
export type TextFieldHintEvents = typeof __propDef.events;
export type TextFieldHintSlots = typeof __propDef.slots;
export default class TextFieldHint extends SvelteComponent<TextFieldHintProps, TextFieldHintEvents, TextFieldHintSlots> {
}
export {};

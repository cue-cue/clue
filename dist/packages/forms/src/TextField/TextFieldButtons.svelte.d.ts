import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        class?: string | undefined;
        autoHide?: boolean | undefined;
        size?: "small" | "medium" | "large" | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type TextFieldButtonsProps = typeof __propDef.props;
export type TextFieldButtonsEvents = typeof __propDef.events;
export type TextFieldButtonsSlots = typeof __propDef.slots;
export default class TextFieldButtons extends SvelteComponent<TextFieldButtonsProps, TextFieldButtonsEvents, TextFieldButtonsSlots> {
}
export {};

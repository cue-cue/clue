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
export type LabelNameProps = typeof __propDef.props;
export type LabelNameEvents = typeof __propDef.events;
export type LabelNameSlots = typeof __propDef.slots;
export default class LabelName extends SvelteComponent<LabelNameProps, LabelNameEvents, LabelNameSlots> {
}
export {};

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
export type HintProps = typeof __propDef.props;
export type HintEvents = typeof __propDef.events;
export type HintSlots = typeof __propDef.slots;
export default class Hint extends SvelteComponent<HintProps, HintEvents, HintSlots> {
}
export {};

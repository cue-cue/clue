import { SvelteComponent } from "svelte";
import LabelName from './LabelName.svelte';
declare const __propDef: {
    props: {
        class?: string | undefined;
        slots?: {
            label?: boolean | undefined;
            desc?: boolean | undefined;
        } | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
        label: {
            Component: typeof LabelName;
        };
        desc: {};
    };
};
export type LabelProps = typeof __propDef.props;
export type LabelEvents = typeof __propDef.events;
export type LabelSlots = typeof __propDef.slots;
export default class Label extends SvelteComponent<LabelProps, LabelEvents, LabelSlots> {
}
export {};

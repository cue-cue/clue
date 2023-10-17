import { SvelteComponent } from "svelte";
import type { HTMLInputAttributes } from 'svelte/elements';
declare const __propDef: {
    props: Pick<HTMLInputAttributes, "id"> & {
        class?: string | undefined;
        manual?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type CheckboxFieldProps = typeof __propDef.props;
export type CheckboxFieldEvents = typeof __propDef.events;
export type CheckboxFieldSlots = typeof __propDef.slots;
export default class CheckboxField extends SvelteComponent<CheckboxFieldProps, CheckboxFieldEvents, CheckboxFieldSlots> {
}
export {};

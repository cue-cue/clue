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
export type SelectOptionListBaseProps = typeof __propDef.props;
export type SelectOptionListBaseEvents = typeof __propDef.events;
export type SelectOptionListBaseSlots = typeof __propDef.slots;
export default class SelectOptionListBase extends SvelteComponent<SelectOptionListBaseProps, SelectOptionListBaseEvents, SelectOptionListBaseSlots> {
    get class(): string | undefined;
    /**accessor*/
    set class(_: string | undefined);
}
export {};

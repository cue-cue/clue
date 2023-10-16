import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        class?: string | undefined;
        active?: boolean | undefined;
    };
    events: {
        click: MouseEvent;
        dblclick: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type SelectOptionProps = typeof __propDef.props;
export type SelectOptionEvents = typeof __propDef.events;
export type SelectOptionSlots = typeof __propDef.slots;
export default class SelectOption extends SvelteComponent<SelectOptionProps, SelectOptionEvents, SelectOptionSlots> {
}
export {};

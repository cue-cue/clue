import { SvelteComponent } from "svelte";
import type { HTMLAnchorAttributes } from 'svelte/elements';
declare const __propDef: {
    props: Pick<HTMLAnchorAttributes, "rel" | "href" | "tabindex" | "target" | "style"> & Record<`data-${string}`, string | undefined> & {
        class?: string | undefined;
        tag?: "button" | "div" | "a" | undefined;
        disabled?: boolean | undefined;
        type?: "action" | "primary" | "secondary" | "ghost" | "outlined" | undefined;
    };
    events: {
        click: MouseEvent;
        dblclick: MouseEvent;
        mousedown: MouseEvent;
        mouseenter: MouseEvent;
        mouseleave: MouseEvent;
        mousemove: MouseEvent;
        mouseout: MouseEvent;
        mouseover: MouseEvent;
        mouseup: MouseEvent;
        contextmenu: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type ButtonFieldProps = typeof __propDef.props;
export type ButtonFieldEvents = typeof __propDef.events;
export type ButtonFieldSlots = typeof __propDef.slots;
export default class ButtonField extends SvelteComponent<ButtonFieldProps, ButtonFieldEvents, ButtonFieldSlots> {
}
export {};

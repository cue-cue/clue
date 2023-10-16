import { SvelteComponent } from "svelte";
import type { HTMLLinkAttributes } from 'svelte/elements';
declare const __propDef: {
    props: Omit<Pick<import("svelte/elements").HTMLAnchorAttributes, "rel" | "href" | "tabindex" | "target" | "style"> & Record<`data-${string}`, string | undefined> & {
        class?: string | undefined;
        tag?: "button" | "div" | "a" | undefined;
        disabled?: boolean | undefined;
        type?: "action" | "primary" | "secondary" | "ghost" | "outlined" | undefined;
    }, "tag"> & {
        class?: string | undefined;
        href?: HTMLLinkAttributes['href'];
        startIcon?: import("@clue/icons/src/types").IconNames<"clue-"> | undefined;
        endIcon?: import("@clue/icons/src/types").IconNames<"clue-"> | undefined;
        size?: "small" | "medium" | "large" | undefined;
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
export type ButtonProps = typeof __propDef.props;
export type ButtonEvents = typeof __propDef.events;
export type ButtonSlots = typeof __propDef.slots;
export default class Button extends SvelteComponent<ButtonProps, ButtonEvents, ButtonSlots> {
}
export {};

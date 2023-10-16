import { SvelteComponent } from "svelte";
import { Icon } from '@cluue/icons';
import type { ComponentProps } from 'svelte';
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
        icon: ComponentProps<Icon>['icon'];
        size?: "small" | "medium" | "large" | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type IconButtonProps = typeof __propDef.props;
export type IconButtonEvents = typeof __propDef.events;
export type IconButtonSlots = typeof __propDef.slots;
export default class IconButton extends SvelteComponent<IconButtonProps, IconButtonEvents, IconButtonSlots> {
}
export {};

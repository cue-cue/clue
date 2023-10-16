import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: Pick<import("svelte/elements").SVGAttributes<SVGElement> & {
        icon: import("../types").IconNames<"clue-">;
        class?: string | undefined;
        width?: number | undefined;
        ratio?: number | undefined;
        height?: number | undefined;
        nodeElement?: HTMLOrSVGElement | undefined;
        transitionFn?: ((node: Element, params: unknown) => import("svelte/transition").TransitionConfig) | undefined;
    }, "icon" | "width" | "height"> & {
        class?: string | undefined;
        color?: string | undefined;
        size?: "small" | "medium" | "large" | undefined;
        reverse?: "x" | "y" | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type IconProps = typeof __propDef.props;
export type IconEvents = typeof __propDef.events;
export type IconSlots = typeof __propDef.slots;
export default class Icon extends SvelteComponent<IconProps, IconEvents, IconSlots> {
}
export {};

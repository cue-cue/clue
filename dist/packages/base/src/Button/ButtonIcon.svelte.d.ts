import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: Pick<import("svelte/elements").SVGAttributes<SVGElement> & {
        icon: import("@clue/icons/src/types").IconNames<"clue-">;
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
    } & {
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ButtonIconProps = typeof __propDef.props;
export type ButtonIconEvents = typeof __propDef.events;
export type ButtonIconSlots = typeof __propDef.slots;
export default class ButtonIcon extends SvelteComponent<ButtonIconProps, ButtonIconEvents, ButtonIconSlots> {
}
export {};

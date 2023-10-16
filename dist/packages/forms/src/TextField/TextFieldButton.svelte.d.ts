import { SvelteComponent } from "svelte";
import type { TransitionConfig } from 'svelte/transition';
declare const __propDef: {
    props: Omit<Pick<import("svelte/elements.js").SVGAttributes<SVGElement> & {
        icon: import("@clue/icons/src/types/index.js").IconNames<"clue-">;
        class?: string | undefined;
        width?: number | undefined;
        ratio?: number | undefined;
        height?: number | undefined;
        nodeElement?: HTMLOrSVGElement | undefined;
        transitionFn?: ((node: Element, params: unknown) => TransitionConfig) | undefined;
    }, "icon" | "width" | "height"> & {
        class?: string | undefined;
        color?: string | undefined;
        size?: "small" | "medium" | "large" | undefined;
        reverse?: "x" | "y" | undefined;
    }, "height" | "size"> & {
        class?: string | undefined;
    };
    events: {
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TextFieldButtonProps = typeof __propDef.props;
export type TextFieldButtonEvents = typeof __propDef.events;
export type TextFieldButtonSlots = typeof __propDef.slots;
export default class TextFieldButton extends SvelteComponent<TextFieldButtonProps, TextFieldButtonEvents, TextFieldButtonSlots> {
}
export {};

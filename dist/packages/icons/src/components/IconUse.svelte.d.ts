import { SvelteComponent } from "svelte";
import type { SVGAttributes } from 'svelte/elements';
import type { ClueSvgIconData } from '../index.js';
import { type TransitionConfig } from 'svelte/transition';
declare const __propDef: {
    props: SVGAttributes<SVGElement> & {
        icon: ClueSvgIconData['default'];
        class?: string | undefined;
        width?: number | undefined;
        ratio?: number | undefined;
        height?: number | undefined;
        nodeElement?: HTMLOrSVGElement | undefined;
        transitionFn?: ((node: Element, params: unknown) => TransitionConfig) | undefined;
    };
    events: {
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type IconUseProps = typeof __propDef.props;
export type IconUseEvents = typeof __propDef.events;
export type IconUseSlots = typeof __propDef.slots;
export default class IconUse extends SvelteComponent<IconUseProps, IconUseEvents, IconUseSlots> {
}
export {};

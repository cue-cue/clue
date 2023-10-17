import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        set?: ((newValue: any) => void) | undefined;
        update?: ((callback: (currentValue: any) => any) => void) | undefined;
        clear?: (() => void) | undefined;
    } & Omit<{
        [x: `data-${string}`]: any;
        accept?: string | undefined;
        alt?: string | undefined;
        autocomplete?: string | undefined;
        capture?: boolean | "user" | "environment" | undefined;
        checked?: boolean | undefined;
        crossorigin?: string | undefined;
        disabled?: boolean | undefined;
        form?: string | undefined;
        formaction?: string | undefined;
        formenctype?: string | undefined;
        formmethod?: string | undefined;
        formnovalidate?: boolean | undefined;
        formtarget?: string | undefined;
        height?: string | number | undefined;
        indeterminate?: boolean | undefined;
        list?: string | undefined;
        max?: string | number | undefined;
        maxlength?: number | undefined;
        min?: string | number | undefined;
        minlength?: number | undefined;
        multiple?: boolean | undefined;
        name?: string | undefined;
        pattern?: string | undefined;
        placeholder?: string | undefined;
        readonly?: boolean | undefined;
        required?: boolean | undefined;
        size?: number | undefined;
        src?: string | undefined;
        step?: string | number | undefined;
        type?: import("svelte/elements").HTMLInputTypeAttribute | undefined;
        value?: any;
        width?: string | number | undefined;
        'on:change'?: import("svelte/elements").ChangeEventHandler<HTMLInputElement> | undefined;
        'bind:checked'?: boolean | undefined;
        'bind:value'?: any;
        'bind:group'?: any;
        'bind:files'?: FileList | undefined;
        'bind:indeterminate'?: boolean | undefined;
        accesskey?: string | undefined;
        autofocus?: boolean | undefined;
        class?: string | undefined;
        contenteditable?: import("svelte/elements").Booleanish | "inherit" | undefined;
        contextmenu?: string | undefined;
        dir?: string | undefined;
        draggable?: import("svelte/elements").Booleanish | undefined;
        enterkeyhint?: "done" | "send" | "search" | "enter" | "go" | "next" | "previous" | undefined;
        hidden?: boolean | undefined;
        id?: string | undefined;
        lang?: string | undefined;
        part?: string | undefined;
        slot?: string | undefined;
        spellcheck?: import("svelte/elements").Booleanish | undefined;
        style?: string | undefined;
        tabindex?: number | undefined;
        title?: string | undefined;
        translate?: "" | "yes" | "no" | undefined;
        inert?: boolean | undefined;
        radiogroup?: string | undefined;
        role?: import("svelte/elements").AriaRole | undefined;
        about?: string | undefined;
        datatype?: string | undefined;
        inlist?: any;
        prefix?: string | undefined;
        property?: string | undefined;
        resource?: string | undefined;
        typeof?: string | undefined;
        vocab?: string | undefined;
        autocapitalize?: string | undefined;
        autocorrect?: string | undefined;
        autosave?: string | undefined;
        color?: string | undefined;
        itemprop?: string | undefined;
        itemscope?: boolean | undefined;
        itemtype?: string | undefined;
        itemid?: string | undefined;
        itemref?: string | undefined;
        results?: number | undefined;
        security?: string | undefined;
        unselectable?: "on" | "off" | undefined;
        inputmode?: "search" | "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | undefined;
        is?: string | undefined;
        'bind:innerHTML'?: string | undefined;
        'bind:textContent'?: string | undefined;
        'bind:innerText'?: string | undefined;
        readonly 'bind:contentRect'?: DOMRectReadOnly | undefined;
        readonly 'bind:contentBoxSize'?: ResizeObserverSize[] | undefined;
        readonly 'bind:borderBoxSize'?: ResizeObserverSize[] | undefined;
        readonly 'bind:devicePixelContentBoxSize'?: ResizeObserverSize[] | undefined;
        'data-sveltekit-keepfocus'?: true | "" | "off" | undefined;
        'data-sveltekit-noscroll'?: true | "" | "off" | undefined;
        'data-sveltekit-preload-code'?: true | "" | "off" | "eager" | "viewport" | "hover" | "tap" | undefined;
        'data-sveltekit-preload-data'?: true | "" | "off" | "hover" | "tap" | undefined;
        'data-sveltekit-reload'?: true | "" | "off" | undefined;
        'data-sveltekit-replacestate'?: true | "" | "off" | undefined;
        'aria-activedescendant'?: string | undefined;
        'aria-atomic'?: import("svelte/elements").Booleanish | undefined;
        'aria-autocomplete'?: "list" | "none" | "inline" | "both" | undefined;
        'aria-busy'?: import("svelte/elements").Booleanish | undefined;
        'aria-checked'?: boolean | "true" | "false" | "mixed" | undefined;
        'aria-colcount'?: number | undefined;
        'aria-colindex'?: number | undefined;
        'aria-colspan'?: number | undefined;
        'aria-controls'?: string | undefined;
        'aria-current'?: "step" | import("svelte/elements").Booleanish | "page" | "location" | "date" | "time" | undefined;
        'aria-describedby'?: string | undefined;
        'aria-details'?: string | undefined;
        'aria-disabled'?: import("svelte/elements").Booleanish | undefined;
        'aria-dropeffect'?: "copy" | "link" | "none" | "execute" | "move" | "popup" | undefined;
        'aria-errormessage'?: string | undefined;
        'aria-expanded'?: import("svelte/elements").Booleanish | undefined;
        'aria-flowto'?: string | undefined;
        'aria-grabbed'?: import("svelte/elements").Booleanish | undefined;
        'aria-haspopup'?: "tree" | "menu" | import("svelte/elements").Booleanish | "dialog" | "grid" | "listbox" | undefined;
        'aria-hidden'?: import("svelte/elements").Booleanish | undefined;
        'aria-invalid'?: import("svelte/elements").Booleanish | "grammar" | "spelling" | undefined;
        'aria-keyshortcuts'?: string | undefined;
        'aria-label'?: string | undefined;
        'aria-labelledby'?: string | undefined;
        'aria-level'?: number | undefined;
        'aria-live'?: "off" | "assertive" | "polite" | undefined;
        'aria-modal'?: import("svelte/elements").Booleanish | undefined;
        'aria-multiline'?: import("svelte/elements").Booleanish | undefined;
        'aria-multiselectable'?: import("svelte/elements").Booleanish | undefined;
        'aria-orientation'?: "horizontal" | "vertical" | undefined;
        'aria-owns'?: string | undefined;
        'aria-placeholder'?: string | undefined;
        'aria-posinset'?: number | undefined;
        'aria-pressed'?: boolean | "true" | "false" | "mixed" | undefined;
        'aria-readonly'?: import("svelte/elements").Booleanish | undefined;
        'aria-relevant'?: "text" | "additions" | "additions removals" | "additions text" | "all" | "removals" | "removals additions" | "removals text" | "text additions" | "text removals" | undefined;
        'aria-required'?: import("svelte/elements").Booleanish | undefined;
        'aria-roledescription'?: string | undefined;
        'aria-rowcount'?: number | undefined;
        'aria-rowindex'?: number | undefined;
        'aria-rowspan'?: number | undefined;
        'aria-selected'?: import("svelte/elements").Booleanish | undefined;
        'aria-setsize'?: number | undefined;
        'aria-sort'?: "none" | "ascending" | "descending" | "other" | undefined;
        'aria-valuemax'?: number | undefined;
        'aria-valuemin'?: number | undefined;
        'aria-valuenow'?: number | undefined;
        'aria-valuetext'?: string | undefined;
        'on:copy'?: import("svelte/elements").ClipboardEventHandler<HTMLInputElement> | undefined;
        'on:cut'?: import("svelte/elements").ClipboardEventHandler<HTMLInputElement> | undefined;
        'on:paste'?: import("svelte/elements").ClipboardEventHandler<HTMLInputElement> | undefined;
        'on:compositionend'?: import("svelte/elements").CompositionEventHandler<HTMLInputElement> | undefined;
        'on:compositionstart'?: import("svelte/elements").CompositionEventHandler<HTMLInputElement> | undefined;
        'on:compositionupdate'?: import("svelte/elements").CompositionEventHandler<HTMLInputElement> | undefined;
        'on:focus'?: import("svelte/elements").FocusEventHandler<HTMLInputElement> | undefined;
        'on:focusin'?: import("svelte/elements").FocusEventHandler<HTMLInputElement> | undefined;
        'on:focusout'?: import("svelte/elements").FocusEventHandler<HTMLInputElement> | undefined;
        'on:blur'?: import("svelte/elements").FocusEventHandler<HTMLInputElement> | undefined;
        'on:beforeinput'?: import("svelte/elements").EventHandler<InputEvent, HTMLInputElement> | undefined;
        'on:input'?: import("svelte/elements").FormEventHandler<HTMLInputElement> | undefined;
        'on:reset'?: import("svelte/elements").FormEventHandler<HTMLInputElement> | undefined;
        'on:submit'?: import("svelte/elements").EventHandler<SubmitEvent, HTMLInputElement> | undefined;
        'on:invalid'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:formdata'?: import("svelte/elements").EventHandler<FormDataEvent, HTMLInputElement> | undefined;
        'on:load'?: import("svelte/elements").EventHandler<Event, Element> | undefined;
        'on:error'?: import("svelte/elements").EventHandler<Event, Element> | undefined;
        'on:toggle'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:keydown'?: import("svelte/elements").KeyboardEventHandler<HTMLInputElement> | undefined;
        'on:keypress'?: import("svelte/elements").KeyboardEventHandler<HTMLInputElement> | undefined;
        'on:keyup'?: import("svelte/elements").KeyboardEventHandler<HTMLInputElement> | undefined;
        'on:abort'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:canplay'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:canplaythrough'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:cuechange'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:durationchange'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:emptied'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:encrypted'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:ended'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:loadeddata'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:loadedmetadata'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:loadstart'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:pause'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:play'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:playing'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:progress'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:ratechange'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:seeked'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:seeking'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:stalled'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:suspend'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:timeupdate'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:volumechange'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:waiting'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:auxclick'?: import("svelte/elements").MouseEventHandler<HTMLInputElement> | undefined;
        'on:click'?: import("svelte/elements").MouseEventHandler<HTMLInputElement> | undefined;
        'on:contextmenu'?: import("svelte/elements").MouseEventHandler<HTMLInputElement> | undefined;
        'on:dblclick'?: import("svelte/elements").MouseEventHandler<HTMLInputElement> | undefined;
        'on:drag'?: import("svelte/elements").DragEventHandler<HTMLInputElement> | undefined;
        'on:dragend'?: import("svelte/elements").DragEventHandler<HTMLInputElement> | undefined;
        'on:dragenter'?: import("svelte/elements").DragEventHandler<HTMLInputElement> | undefined;
        'on:dragexit'?: import("svelte/elements").DragEventHandler<HTMLInputElement> | undefined;
        'on:dragleave'?: import("svelte/elements").DragEventHandler<HTMLInputElement> | undefined;
        'on:dragover'?: import("svelte/elements").DragEventHandler<HTMLInputElement> | undefined;
        'on:dragstart'?: import("svelte/elements").DragEventHandler<HTMLInputElement> | undefined;
        'on:drop'?: import("svelte/elements").DragEventHandler<HTMLInputElement> | undefined;
        'on:mousedown'?: import("svelte/elements").MouseEventHandler<HTMLInputElement> | undefined;
        'on:mouseenter'?: import("svelte/elements").MouseEventHandler<HTMLInputElement> | undefined;
        'on:mouseleave'?: import("svelte/elements").MouseEventHandler<HTMLInputElement> | undefined;
        'on:mousemove'?: import("svelte/elements").MouseEventHandler<HTMLInputElement> | undefined;
        'on:mouseout'?: import("svelte/elements").MouseEventHandler<HTMLInputElement> | undefined;
        'on:mouseover'?: import("svelte/elements").MouseEventHandler<HTMLInputElement> | undefined;
        'on:mouseup'?: import("svelte/elements").MouseEventHandler<HTMLInputElement> | undefined;
        'on:select'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:selectionchange'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:selectstart'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:touchcancel'?: import("svelte/elements").TouchEventHandler<HTMLInputElement> | undefined;
        'on:touchend'?: import("svelte/elements").TouchEventHandler<HTMLInputElement> | undefined;
        'on:touchmove'?: import("svelte/elements").TouchEventHandler<HTMLInputElement> | undefined;
        'on:touchstart'?: import("svelte/elements").TouchEventHandler<HTMLInputElement> | undefined;
        'on:gotpointercapture'?: import("svelte/elements").PointerEventHandler<HTMLInputElement> | undefined;
        'on:pointercancel'?: import("svelte/elements").PointerEventHandler<HTMLInputElement> | undefined;
        'on:pointerdown'?: import("svelte/elements").PointerEventHandler<HTMLInputElement> | undefined;
        'on:pointerenter'?: import("svelte/elements").PointerEventHandler<HTMLInputElement> | undefined;
        'on:pointerleave'?: import("svelte/elements").PointerEventHandler<HTMLInputElement> | undefined;
        'on:pointermove'?: import("svelte/elements").PointerEventHandler<HTMLInputElement> | undefined;
        'on:pointerout'?: import("svelte/elements").PointerEventHandler<HTMLInputElement> | undefined;
        'on:pointerover'?: import("svelte/elements").PointerEventHandler<HTMLInputElement> | undefined;
        'on:pointerup'?: import("svelte/elements").PointerEventHandler<HTMLInputElement> | undefined;
        'on:lostpointercapture'?: import("svelte/elements").PointerEventHandler<HTMLInputElement> | undefined;
        'on:scroll'?: import("svelte/elements").UIEventHandler<HTMLInputElement> | undefined;
        'on:resize'?: import("svelte/elements").UIEventHandler<HTMLInputElement> | undefined;
        'on:wheel'?: import("svelte/elements").WheelEventHandler<HTMLInputElement> | undefined;
        'on:animationstart'?: import("svelte/elements").AnimationEventHandler<HTMLInputElement> | undefined;
        'on:animationend'?: import("svelte/elements").AnimationEventHandler<HTMLInputElement> | undefined;
        'on:animationiteration'?: import("svelte/elements").AnimationEventHandler<HTMLInputElement> | undefined;
        'on:transitionstart'?: import("svelte/elements").TransitionEventHandler<HTMLInputElement> | undefined;
        'on:transitionrun'?: import("svelte/elements").TransitionEventHandler<HTMLInputElement> | undefined;
        'on:transitionend'?: import("svelte/elements").TransitionEventHandler<HTMLInputElement> | undefined;
        'on:transitioncancel'?: import("svelte/elements").TransitionEventHandler<HTMLInputElement> | undefined;
        'on:outrostart'?: import("svelte/elements").EventHandler<CustomEvent<null>, HTMLInputElement> | undefined;
        'on:outroend'?: import("svelte/elements").EventHandler<CustomEvent<null>, HTMLInputElement> | undefined;
        'on:introstart'?: import("svelte/elements").EventHandler<CustomEvent<null>, HTMLInputElement> | undefined;
        'on:introend'?: import("svelte/elements").EventHandler<CustomEvent<null>, HTMLInputElement> | undefined;
        'on:message'?: import("svelte/elements").MessageEventHandler<HTMLInputElement> | undefined;
        'on:messageerror'?: import("svelte/elements").MessageEventHandler<HTMLInputElement> | undefined;
        'on:visibilitychange'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:cancel'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:close'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:fullscreenchange'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
        'on:fullscreenerror'?: import("svelte/elements").EventHandler<Event, HTMLInputElement> | undefined;
    } & {
        class?: string | undefined;
        nodeElement?: HTMLElement | undefined;
        id?: string | undefined;
    }, "maxlength" | "rows"> & Pick<import("svelte/elements").HTMLTextareaAttributes & {
        class?: string | undefined;
        nodeElement?: HTMLElement | undefined;
        id?: string | undefined;
    }, "maxlength" | "rows"> & {
        class?: string | undefined;
        multiline?: boolean | undefined;
    };
    events: {
        input: any;
        change: any;
        keydown: any;
        keyup: any;
        click: any;
        focus: any;
        blur: any;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type InputProps = typeof __propDef.props;
export type InputEvents = typeof __propDef.events;
export type InputSlots = typeof __propDef.slots;
export default class Input extends SvelteComponent<InputProps, InputEvents, InputSlots> {
    get set(): (newValue: any) => void;
    get update(): (callback: (currentValue: any) => any) => void;
    get clear(): () => void;
}
export {};

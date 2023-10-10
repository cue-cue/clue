import type { ActionReturn } from "svelte/action";

export type OutclickEvent = CustomEvent<unknown>

type OutclickParams = {
    handler?:VoidFunction
}

export const outclick = (node:HTMLElement, _params?:OutclickParams):ActionReturn<OutclickParams> => {
    let params = _params
    const handleClick = (event:MouseEvent) => {
        const target = event.target as HTMLElement
        if (!node.contains(target)) {
            params?.handler?.()
            node.dispatchEvent(new CustomEvent<unknown>("outclick"));
        }
    };

    document.addEventListener("click", handleClick, true);

    return {
        update(_params) {
            params = _params
        },
        destroy() {
            document.removeEventListener("click", handleClick, true);
        }
    };
}
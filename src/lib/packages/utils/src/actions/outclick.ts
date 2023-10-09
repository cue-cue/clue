export type OutclickEvent = CustomEvent<unknown>

export const outclick = (node:HTMLElement) => {
    const handleClick = (event:MouseEvent) => {
        const target = event.target as HTMLElement
        if (!node.contains(target)) {
            node.dispatchEvent(new CustomEvent<unknown>("outclick"));
        }
    };

    document.addEventListener("click", handleClick, true);

    return {
        destroy() {
            document.removeEventListener("click", handleClick, true);
        }
    };
}
export const outclick = (node, _params) => {
    let params = _params;
    const handleClick = (event) => {
        const target = event.target;
        if (!node.contains(target)) {
            params?.handler?.();
            node.dispatchEvent(new CustomEvent("outclick"));
        }
    };
    document.addEventListener("click", handleClick, true);
    return {
        update(_params) {
            params = _params;
        },
        destroy() {
            document.removeEventListener("click", handleClick, true);
        }
    };
};

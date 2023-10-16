import { createFloatingActions } from "svelte-floating-ui";
import { TriggerCombinator } from "../Trigger/index.js";
const events = (action, node, handlers) => {
    if (!Object.keys(handlers).length)
        return;
    const methodMap = new Map([
        ['add', 'addEventListener'],
        ['remove', 'removeEventListener'],
    ]);
    const method = methodMap.get(action) || 'removeEventListener';
    Object.entries(handlers).forEach(([eventName, handler]) => {
        node[method](eventName, handler);
    });
};
export const createPopoverActions = (options) => {
    const [_targetAction, _contentAction, update] = createFloatingActions(options);
    const triggerCombinator = options.trigger && new TriggerCombinator(options.trigger);
    const targetAction = (node) => {
        const rootActionResult = _targetAction(node);
        options?.target?.init?.(node);
        const targetHandlers = triggerCombinator?.handlers.target || {};
        events('add', node, targetHandlers);
        const destroy = () => {
            events('remove', node, targetHandlers);
            options?.target?.destroy?.();
            rootActionResult?.destroy?.();
        };
        const update = (params) => {
            rootActionResult?.update?.(params);
        };
        return {
            destroy,
            update
        };
    };
    const contentAction = (node) => {
        const rootActionResult = _contentAction(node);
        options?.content?.init?.(node);
        const contentHandlers = triggerCombinator?.handlers.content || {};
        events('add', node, contentHandlers);
        const destroy = () => {
            events('remove', node, contentHandlers);
            options?.content?.destroy?.();
            rootActionResult?.destroy?.();
        };
        const update = (params) => {
            rootActionResult?.update?.(params);
        };
        return {
            destroy,
            update
        };
    };
    return {
        targetAction,
        contentAction,
        update
    };
};

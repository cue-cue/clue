export const createAction = (name, action, params) => {
    return {
        name,
        action,
        params
    };
};
export const actionList = (node, actions) => {
    let isInit = false;
    const updateHandlers = new Map();
    const destroyHandlers = new Map();
    const init = (_actions) => {
        if (!_actions?.length)
            return;
        _actions.forEach(({ name, action, params }) => {
            const { update, destroy } = action(node, params) || {};
            if (update) {
                updateHandlers.set(name, update);
            }
            if (destroy) {
                destroyHandlers.set(name, destroy);
            }
        });
        isInit = true;
    };
    if (actions?.length) {
        init(actions);
    }
    return {
        update(actions) {
            if (isInit) {
                actions.forEach(({ name, params }) => {
                    updateHandlers.get(name)?.(params);
                });
            }
            else {
                init(actions);
            }
        },
        destroy() {
            destroyHandlers.forEach(handler => handler?.());
        }
    };
};

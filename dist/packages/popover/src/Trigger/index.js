export class Trigger {
    handlers;
    elements;
    events;
    constructor(elements, events) {
        this.elements = elements;
        this.events = events;
    }
    setHandlers(handlers) {
        this.handlers = handlers;
    }
    open() {
        this.events?.open?.();
    }
    close() {
        this.events?.close?.();
    }
}
export class TriggerCombinator {
    trigger;
    handlers;
    constructor(trigger) {
        this.trigger = [trigger].flat();
        this.handlers = this.createHandlers(this.trigger);
    }
    createHandlers(trigger = this.trigger) {
        const res = trigger.reduce((val, trigger) => {
            Object.entries(trigger.handlers).forEach(([_name, handlers]) => {
                const name = _name;
                Object.entries(handlers).forEach(([_eventName, handler]) => {
                    const eventName = _eventName;
                    if (!val[name]) {
                        val[name] = {};
                    }
                    if (val[name]?.[eventName]) {
                        //@ts-ignore
                        val[name][eventName].push(handler);
                    }
                    else {
                        //@ts-ignore
                        val[name][eventName] = [handler];
                    }
                });
            });
            return val;
        }, {});
        return Object.entries(res).reduce((val, [_name, handlers]) => {
            const name = _name;
            Object.entries(handlers).forEach(([eventName, handlers]) => {
                if (!val[name]) {
                    val[name] = {};
                }
                //@ts-ignore
                val[name][eventName] = (e) => handlers.forEach((handler) => handler(e));
            });
            return val;
        }, {});
    }
}

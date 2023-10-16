import { getContext, hasContext, setContext } from "svelte";
export class Context {
    #name;
    prefix = 'Clue';
    constructor(name, options) {
        this.#name = name;
        if (options?.prefix) {
            this.prefix = options.prefix;
        }
    }
    get name() {
        return this.prefix + this.#name;
    }
    set(value) {
        return setContext(this.name, value);
    }
    get() {
        return getContext(this.name);
    }
    has() {
        return hasContext(this.name);
    }
}

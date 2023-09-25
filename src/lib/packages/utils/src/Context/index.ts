import { getContext, hasContext, setContext } from "svelte"

interface IContextOptions {
    prefix?:string
}

export class Context<T extends Parameters<typeof setContext>[1]> {
    #name
    public prefix = 'Clue'
    constructor(name:string, options?:IContextOptions) {
        this.#name = name

        if (options?.prefix) {
            this.prefix = options.prefix
        }
    }
    get name() {
        return this.prefix + this.#name
    }
    set(value:T) {
        return setContext<T>(this.name, value)
    }
    get() {
        return getContext<T>(this.name)
    }
    has() {
        return hasContext(this.name)
    }
}
import { setContext } from "svelte";
interface IContextOptions {
    prefix?: string;
}
export declare class Context<T extends Parameters<typeof setContext>[1]> {
    #private;
    prefix: string;
    constructor(name: string, options?: IContextOptions);
    get name(): string;
    set(value: T): T;
    get(): T;
    has(): boolean;
}
export {};

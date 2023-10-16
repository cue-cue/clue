import { Context } from '@cluue/utils';
import type { Writable } from 'svelte/store';
interface IData {
    id?: string | null;
    name?: string | null;
    disabled?: boolean | null;
    manual?: boolean;
}
export declare class FieldContext extends Context<Writable<IData>> {
    constructor();
}
export declare const fieldContext: FieldContext;
export {};

import type { ActionReturn } from "svelte/action";
type ActionFunction<T> = (node: HTMLElement, params: T) => Partial<ActionReturn<T>> | undefined;
export declare const createAction: <T, U extends (...args: never[]) => unknown = ActionFunction<T>>(name: string, action: U, params?: Parameters<U>[1] | undefined) => {
    name: string;
    action: U;
    params: Parameters<U>[1] | undefined;
};
export type ActionListParams = Array<ReturnType<typeof createAction>>;
export type ActionList = <T extends ActionListParams>(node: HTMLElement, actions?: T) => ActionReturn<T>;
export declare const actionList: ActionList;
export {};

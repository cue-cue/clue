import type { ActionReturn } from "svelte/action";
export type OutclickEvent = CustomEvent<unknown>;
type OutclickParams = {
    handler?: VoidFunction;
};
export declare const outclick: (node: HTMLElement, _params?: OutclickParams) => ActionReturn<OutclickParams>;
export {};

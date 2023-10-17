import { Context } from "@cluue/utils";
import type { ComponentProps } from "svelte";
import type { Writable } from "svelte/store";
import type TextField from "./TextField.svelte";
import type { TextFieldBase } from "./index.js";
type Data = Writable<Pick<ComponentProps<TextField>, 'error' | 'disabled' | 'id'>>;
export declare const context: Context<Data>;
export declare const textFieldButtonsContext: Context<Writable<{
    count: number;
    mounted: boolean;
}>>;
export declare const textFieldBaseContext: Context<Writable<{
    size: ComponentProps<TextFieldBase>['size'];
}>>;
export {};

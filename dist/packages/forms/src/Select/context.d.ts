import { Context } from "@cluue/utils";
import type { ComponentProps } from "svelte";
import type { Writable } from "svelte/store";
import type { Select } from "./index.js";
import type { ISelectOptionListCoreData } from "./types.js";
type Data = Writable<Pick<ComponentProps<Select<any, any>>, 'opened'>>;
export declare const context: Context<Data>;
export declare const selectOptionListCoreContext: Context<Writable<{
    data: ISelectOptionListCoreData<any>[];
}>>;
export {};

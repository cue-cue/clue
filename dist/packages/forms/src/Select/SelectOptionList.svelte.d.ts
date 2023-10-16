import { SvelteComponent } from "svelte";
import type { ISelectOptionListCoreData, IOption, OptionValue } from './types.js';
declare class __sveltets_Render<T extends IOption<OptionValue>[]> {
    props(): {
        class?: string | undefined;
        data?: ISelectOptionListCoreData<T>[] | undefined;
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {};
}
export type SelectOptionListProps<T extends IOption<OptionValue>[]> = ReturnType<__sveltets_Render<T>['props']>;
export type SelectOptionListEvents<T extends IOption<OptionValue>[]> = ReturnType<__sveltets_Render<T>['events']>;
export type SelectOptionListSlots<T extends IOption<OptionValue>[]> = ReturnType<__sveltets_Render<T>['slots']>;
export default class SelectOptionList<T extends IOption<OptionValue>[]> extends SvelteComponent<SelectOptionListProps<T>, SelectOptionListEvents<T>, SelectOptionListSlots<T>> {
}
export {};

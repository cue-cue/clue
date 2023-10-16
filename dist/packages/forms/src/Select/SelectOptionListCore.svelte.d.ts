import { SvelteComponent } from "svelte";
import type { IOption, ISelectOptionListCoreData, OptionValueKey } from "./types.js";
declare class __sveltets_Render<OptionsGeneric extends IOption<any>[], MultipleGeneric extends boolean, ValueTypeGeneric extends 'key' | 'advanced' | undefined, KeyGeneric extends OptionValueKey<OptionsGeneric[number]['value']>> {
    props(): {
        set?: (<T extends boolean>(newValue: T extends true ? (ValueTypeGeneric extends "advanced" ? OptionsGeneric[number]["value"] : OptionsGeneric[number]["value"][KeyGeneric])[] : (ValueTypeGeneric extends "advanced" ? OptionsGeneric[number]["value"] : OptionsGeneric[number]["value"][KeyGeneric]) | undefined) => void) | undefined;
        clear?: (() => void) | undefined;
        add?: ((option: OptionsGeneric[number]) => void) | undefined;
        remove?: ((option: OptionsGeneric[number]) => void) | undefined;
    } & {
        class?: string | undefined;
        key?: KeyGeneric | undefined;
        multiple?: MultipleGeneric | undefined;
        options: OptionsGeneric;
        valueType?: ValueTypeGeneric | undefined;
        value?: (MultipleGeneric extends true ? (ValueTypeGeneric extends "advanced" ? OptionsGeneric[number]["value"] : OptionsGeneric[number]["value"][KeyGeneric])[] : (ValueTypeGeneric extends "advanced" ? OptionsGeneric[number]["value"] : OptionsGeneric[number]["value"][KeyGeneric]) | undefined) | undefined;
        filter?: string | ((option: OptionsGeneric[number]) => boolean) | undefined;
        disabled?: boolean | undefined;
        readonly?: boolean | undefined;
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {
            data: ISelectOptionListCoreData<OptionsGeneric>[];
            multiple?: MultipleGeneric | undefined;
        };
    };
}
export type SelectOptionListCoreProps<OptionsGeneric extends IOption<any>[], MultipleGeneric extends boolean, ValueTypeGeneric extends 'key' | 'advanced' | undefined, KeyGeneric extends OptionValueKey<OptionsGeneric[number]['value']>> = ReturnType<__sveltets_Render<OptionsGeneric, MultipleGeneric, ValueTypeGeneric, KeyGeneric>['props']>;
export type SelectOptionListCoreEvents<OptionsGeneric extends IOption<any>[], MultipleGeneric extends boolean, ValueTypeGeneric extends 'key' | 'advanced' | undefined, KeyGeneric extends OptionValueKey<OptionsGeneric[number]['value']>> = ReturnType<__sveltets_Render<OptionsGeneric, MultipleGeneric, ValueTypeGeneric, KeyGeneric>['events']>;
export type SelectOptionListCoreSlots<OptionsGeneric extends IOption<any>[], MultipleGeneric extends boolean, ValueTypeGeneric extends 'key' | 'advanced' | undefined, KeyGeneric extends OptionValueKey<OptionsGeneric[number]['value']>> = ReturnType<__sveltets_Render<OptionsGeneric, MultipleGeneric, ValueTypeGeneric, KeyGeneric>['slots']>;
export default class SelectOptionListCore<OptionsGeneric extends IOption<any>[], MultipleGeneric extends boolean, ValueTypeGeneric extends 'key' | 'advanced' | undefined, KeyGeneric extends OptionValueKey<OptionsGeneric[number]['value']>> extends SvelteComponent<SelectOptionListCoreProps<OptionsGeneric, MultipleGeneric, ValueTypeGeneric, KeyGeneric>, SelectOptionListCoreEvents<OptionsGeneric, MultipleGeneric, ValueTypeGeneric, KeyGeneric>, SelectOptionListCoreSlots<OptionsGeneric, MultipleGeneric, ValueTypeGeneric, KeyGeneric>> {
    get set(): <T extends boolean>(newValue: T extends true ? (ValueTypeGeneric extends "advanced" ? OptionsGeneric[number]["value"] : OptionsGeneric[number]["value"][KeyGeneric])[] : (ValueTypeGeneric extends "advanced" ? OptionsGeneric[number]["value"] : OptionsGeneric[number]["value"][KeyGeneric]) | undefined) => void;
    get clear(): () => void;
    get add(): (option: OptionsGeneric[number]) => void;
    get remove(): (option: OptionsGeneric[number]) => void;
}
export {};

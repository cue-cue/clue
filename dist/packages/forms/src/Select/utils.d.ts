import type { OptionValue, OptionValueKey } from "./types.js";
export declare const getOptionValueKey: <T extends OptionValue>(value: T, key?: OptionValueKey<T> | undefined) => string | number;

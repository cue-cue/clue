/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { OptionValue, OptionValueKey } from "./types.js";

export const getOptionValueKey = <T extends OptionValue>(value:T, key?:OptionValueKey<T>):string | number => {
    if (typeof value === 'object' && !Array.isArray(value)) {
        if (key) {
            //@ts-ignore
            return value[key]
        } else {
            //@ts-ignore
            return value.id
        }
    }
    return value as Exclude<typeof value, object>
}
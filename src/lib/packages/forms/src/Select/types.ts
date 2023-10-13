export type OptionValue = string | number | object

export type OptionValueKey<T extends OptionValue> = T extends object ? keyof T | symbol : Exclude<OptionValue, object>

export interface IOption<T extends OptionValue> {
    value:T
    label?:string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ISelectOptionListCoreData<T extends IOption<OptionValue>[]> {
    option:T[number]
    active:boolean
    label:string
    clickHandler: () => void
    key:Exclude<OptionValue, object>
}
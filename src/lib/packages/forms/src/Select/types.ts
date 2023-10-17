export type OptionValue = string | number | Record<string, unknown>
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
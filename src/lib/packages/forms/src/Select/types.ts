export interface IOption<T extends string | number | object> {
    value:T
    label?:string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ISelectOptionListCoreData<T extends IOption<any>[]> {
    option:T[number]
    active:boolean
    label:string
    clickHandler: () => void
    key:string
}
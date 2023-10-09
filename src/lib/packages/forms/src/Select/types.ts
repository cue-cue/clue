export interface IOption<T extends string | number | object> {
    value:T
    label?:string
}
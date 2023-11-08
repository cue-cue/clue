export interface ICellParams<T extends Date = Date> {
    from:T
    to:T
}

export class Cell<T extends Date = Date> {
    from
    to
    constructor({
        from,
        to
    }:ICellParams<T>) {
        this.from = from
        this.to = to
    }
}
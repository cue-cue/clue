export interface ICellParams {
	from: Date
	to: Date
}

export class Cell {
	from
	to
	constructor({ from, to }: ICellParams) {
		this.from = from
		this.to = to
	}
	static isSame(a: Cell, b: Cell) {
		return +a.from === +b.from && +a.to === +b.to
	}
}

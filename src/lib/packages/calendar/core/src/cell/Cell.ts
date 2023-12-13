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
	isSame(cell:Cell) {
		return +cell.from === +this.from && +cell.to === +this.to
	}
}

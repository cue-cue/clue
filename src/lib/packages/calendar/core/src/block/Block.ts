import dayjs from 'dayjs'
import { Cell } from '../cell/index.js'
import { addToCellList } from './utils.js'

export interface IBlockParams extends Cell {
	drift?: {
		before?: Date | number
		after?: Date | number
	}
}

export class Block extends Cell {
	drift
	constructor({ from, to, drift }: IBlockParams) {
		super({ from, to })
		this.drift = this.createDrift(drift)
	}
	static addToCellList = addToCellList

	private createDrift(driftData: IBlockParams['drift']) {
		const { before, after } = driftData || {}

		const beforeDate = before ? (before instanceof Date ? before : dayjs(this.from).add(-before, 'minutes').toDate()) : undefined
		const afterDate = after ? (after instanceof Date ? after : dayjs(this.to).add(after, 'minutes').toDate()) : undefined

		return {
			before: beforeDate && new Cell({ from: beforeDate, to: this.from }),
			after: afterDate && new Cell({ from: this.to, to: afterDate })
		}
	}

	getCellWithDrift(): Cell {
		let { from, to } = this

		if (!this.drift)
			return new Cell({
				from,
				to
			})

		if (this.drift.before && +from > +this.drift.before.from) {
			from = this.drift.before.from
		}

		if (this.drift.after && +to < +this.drift.after.to) {
			to = this.drift.after.to
		}

		return new Cell({
			from,
			to
		})
	}
}

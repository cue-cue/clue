/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type { Cell } from '../cell/index.js'
import { mergeDisabled } from './lib.js'

export interface IDisabledParams extends Partial<Pick<Cell, 'from' | 'to'>> {
	include?: Disabled['include']
	availability?: {
		total: number
		occupied?: number
		free?: number
	}
}

export class Disabled {
	availability
	from
	to
	include?: '()' | '[]' | '[)' | '(]' //[ - include; ( - exclude
	parsedInclude
	type
	constructor({ availability, from, to, include = '[]' }: IDisabledParams = {}) {
		this.availability = this.#genAvailability(availability)
		this.from = from
		this.to = to
		this.include = include
		this.type = this.getType()
		this.parsedInclude = this.parseInclude()
	}

	static merge = mergeDisabled

	#genAvailability(value: IDisabledParams['availability']): Required<Exclude<typeof value, undefined>> {
		let { occupied, free, total = 0 } = value || {}

		if (total < 0) total = 0

		if (free === undefined) free = total - (occupied || 0)
		if (free < 0) free = 0
		if (free > total) free = total

		if (occupied === undefined) occupied = total - (free || 0)
		if (occupied < 0) occupied = 0
		if (occupied > total) occupied = total

		if (free > total - occupied) free = total - occupied

		return {
			total,
			occupied,
			free
		}
	}

	setAvailability(value: Disabled['availability']) {
		this.availability = this.#genAvailability(value)
	}

	parseInclude() {
		const [from, to] = this.include ? (this.include.split('') as ['(' | '[' | undefined, ']' | ')' | undefined]) : []
		return {
			from,
			to
		}
	}

	getType(): 'from' | 'to' | 'between' | 'empty' {
		if (this.from && this.to) return 'between'
		if (this.from) return 'from'
		if (this.to) return 'to'
		return 'empty'
	}

	check(a: Date, b: Date, operator: '>' | '<', includeCheck = true) {
		const { from, to } = this.parsedInclude
		const isInclude = includeCheck ? (operator === '>' ? from === '[' : to === ']') : false
		switch (operator) {
			case '>': {
				if (isInclude) {
					return a >= b
				}
				return a > b
			}
			case '<': {
				if (isInclude) {
					return a <= b
				}
				return a < b
			}
			default:
				return false
		}
	}

	isBefore(cell: Cell | Date) {
		if (this.type !== 'to' || !this.to) return false
		const check = (date: Date | string) => {
			if (!this.to) return false
			return this.check(new Date(date), this.to, '<')
		}
		if (cell instanceof Date) {
			return check(cell)
		} else {
			return check(cell.from) || check(cell.to)
		}
	}

	isAfter(cellOrDate: Cell | Date) {
		if (this.type !== 'from' || !this.from) return false
		const check = (date: Date | string) => {
			if (!this.from) return false
			return this.check(new Date(date), this.from, '>')
		}
		if (cellOrDate instanceof Date) {
			return check(cellOrDate)
		} else {
			return check(cellOrDate.from) || check(cellOrDate.to)
		}
	}

	isBetween(cellOrDate: Cell | Date) {
		if (!this.from || !this.to) return false
		const _isBetween = ({
			date,
			checker = {
				from: this.from!,
				to: this.to!
			},
			includeCheck = true
		}: {
			date: Date | string
			checker?: {
				from: Date
				to: Date
			}
			includeCheck?: boolean
		}) => {
			date = new Date(date)
			return this.check(date, checker.from, '>', includeCheck) && this.check(date, checker.to, '<', includeCheck)
		}

		if (cellOrDate instanceof Date) {
			return _isBetween({
				date: cellOrDate
			})
		} else {
			const include = // Слоты входят в заблокированное пространство
				_isBetween({
					date: cellOrDate.from
				}) &&
				_isBetween({
					date: cellOrDate.to
				})
			const disableInclude = // Заблокированное пространство входит в слоты
				_isBetween({
					date: this.from,
					checker: cellOrDate,
					includeCheck: false
				}) ||
				_isBetween({
					date: this.to,
					checker: cellOrDate,
					includeCheck: false
				})
			return include || disableInclude
		}
	}

	isDisabled(
		cellOrDate: Cell | Date,
		_options?: {
			checkAvailability?: boolean
		}
	): boolean {
		const options: Required<typeof _options> = {
			checkAvailability: true,
			..._options
		}

		if (options.checkAvailability && this.availability?.free > 0) return false

		switch (this.type) {
			case 'between': {
				return this.isBetween(cellOrDate)
			}
			case 'to': {
				return this.isBefore(cellOrDate)
			}
			case 'from': {
				return this.isAfter(cellOrDate)
			}
			case 'empty':
				return false
			default:
				return false
		}
	}
}

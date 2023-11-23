/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Calendar } from '../calendar/index.js'
import type { Cell } from '../cell/index.js'
import dayjs from 'dayjs'

interface ISelectOptions {
	allowBetweenDays?: boolean
	minTimeLength?: number //minutes
	fixTimeLength?: number //minutes
}

interface ISelectEvents {
	set: (selected: Select['selected']) => void
}
interface ISelectParams {
	calendar: Calendar
	options?: ISelectOptions
	on?: Partial<ISelectEvents>
}

export class Select {
	calendar
	selected?: Pick<Cell, 'from' | 'to'>
	options: ISelectOptions
	on
	#defOptions: ISelectOptions = {
		allowBetweenDays: false,
		minTimeLength: undefined,
		fixTimeLength: undefined
	}

	constructor({ calendar, options, on }: ISelectParams) {
		this.calendar = calendar
		this.on = on
		this.options = {
			...this.#defOptions,
			...options
		}
	}

	get minTimeLength() {
		//Return ms
		return this.options.minTimeLength && this.options.minTimeLength * 1000 * 60
	}

	get fixTimeLength() {
		//Return ms
		return this.options.fixTimeLength && this.options.fixTimeLength * 1000 * 60
	}

	updateCalendar(calendar: ISelectParams['calendar']) {
		this.calendar = calendar
	}

	updateOptions(options: ISelectParams['options']) {
		this.options = {
			...this.#defOptions,
			...this.options,
			...options
		}
	}

	#isBetweenDays({ from, to }: Cell) {
		const isBetween = !dayjs(from).add(1, 'ms').isSame(dayjs(to).add(-1, 'ms'), 'day')
		const isAllow = this.options.allowBetweenDays ?? false
		return {
			isBetween,
			isAllow,
			isError: !isAllow && isBetween
		}
	}

	setMiddleware(
		newSelected: Cell | undefined,
		options?: {
			disableMinTimeLength?: boolean
		}
	) {
		if (!newSelected) return

		let { from, to } = newSelected
		from = new Date(from)
		to = new Date(to)

		const duration = +to - +from

		if (this.fixTimeLength) {
			to = dayjs(from).add(this.fixTimeLength, 'ms').toDate()
		} else {
			if (!options?.disableMinTimeLength && this.minTimeLength && duration < this.minTimeLength) {
				to = dayjs(to)
					.add(this.minTimeLength - duration, 'ms')
					.toDate()
				const isBetweenDays = this.#isBetweenDays({ from, to })
				if (isBetweenDays.isError) {
					to = dayjs(from).add(1, 'day').startOf('day').toDate()
				}
			}
		}

		const { disabledListItem, blockItem } = this.calendar.isDisabled({ from, to })

		if (disabledListItem?.from) {
			to = disabledListItem.from
		}

		if (blockItem?.from && +to < +blockItem.from) {
			to = blockItem?.from
		}

		const { disabled } = this.calendar.isDisabled({ from, to })

		if (disabled) return

		return {
			from,
			to
		}
	}

	set(
		newSelected: Cell | undefined,
		options?: Parameters<Select['setMiddleware']>[1] & {
			force?: boolean //Ignore disabled
		}
	) {
		const { force, ...middlewareOptions } = options || {}

		if (force) {
			this.selected = newSelected
		} else {
			this.selected = this.setMiddleware(newSelected, middlewareOptions)
		}

		this.on?.set?.(this.selected)
		return this.selected
	}

	pushMiddleware({ from, to }: Partial<Cell>) {
		if (!this.selected) return
		const newSelected = { ...this.selected }

		if (from && +new Date(from) < +newSelected.from) newSelected.from = from
		if (to && +new Date(to) > +newSelected.to) newSelected.to = to

		const isDisallow =
			from &&
			to &&
			(this.calendar.isDisabled(newSelected).disabled ||
				this.calendar.isBlockDisabled(newSelected).result)
		if (isDisallow) return { from, to }

		return newSelected
	}

	push({ from, to }: Partial<Cell>) {
		if (!this.selected) return
		const newSelected = this.pushMiddleware({ from, to })

		const setResult = this.set(newSelected, {
			disableMinTimeLength: true
		})

		if (!setResult && from && to) {
			this.set(
				{ from, to },
				{
					disableMinTimeLength: true
				}
			)
		}
	}

	shift({ from, to }: Partial<Cell>) {
		if (!this.selected) return
		const newSelected = { ...this.selected }

		if (from && +new Date(from) > +newSelected.from) newSelected.from = from
		if (to && +new Date(to) < +newSelected.to) newSelected.to = to

		this.set(newSelected, {
			disableMinTimeLength: true
		})
	}

	check({ from, to }: Cell): boolean {
		if (!this.selected) return false
		return +from >= +this.selected.from && +to <= +this.selected.to
	}

	validate<T extends boolean = boolean>({
		from,
		to
	}: Cell): T extends false
		? undefined
		: {
				isEqual: Record<'from' | 'to' | 'tail' | 'head', boolean>
				isIn: Record<'from' | 'fromInset' | 'to' | 'toInset', boolean>
				isDouble: boolean
				isInset: boolean
				betweenDays: {
					isBetween: boolean
					isAllow: boolean
					isError: boolean
				}
		  } {
		//@ts-ignore
		if (!this.selected) return
		const isEqual = {
			from: +new Date(from) === +this.selected.from,
			to: +new Date(to) === +this.selected.to,
			tail: +new Date(to) === +this.selected.from,
			head: +new Date(from) === +this.selected.to
		}
		const isIn = {
			from: +new Date(from) >= +this.selected.from && +new Date(from) <= +this.selected.to,
			fromInset: +new Date(from) > +this.selected.from && +new Date(from) < +this.selected.to,
			to: +new Date(to) >= +this.selected.from && +new Date(to) <= +this.selected.to,
			toInset: +new Date(to) > +this.selected.from && +new Date(to) < +this.selected.to
		}
		const isDouble = isEqual.from && isEqual.to
		const isInset = !isEqual.from && !isEqual.to && isIn.fromInset && isIn.toInset
		const betweenDays = this.#isBetweenDays({
			from: new Date(Math.min(+this.selected.from, +from)),
			to: new Date(Math.max(+this.selected.to, +to))
		})
		//@ts-ignore
		return {
			isEqual,
			isIn,
			isDouble,
			isInset,
			betweenDays
		}
	}

	select(
		{ from, to }: Cell,
		_options?: {
			mode?: 'single' | 'range'
		}
	) {
		const options: typeof _options = {
			mode: 'single',
			..._options
		}
		if (this.selected === undefined) {
			this.set({
				//Если пусто, то ставим "как есть"
				from,
				to
			})
		} else {
			const { isEqual, isIn, isDouble, isInset, betweenDays } = this.validate<true>({ from, to })
			if (isDouble) {
				//Если селекты равны, то сбрасываем значение
				this.clear()
			} else if (this.fixTimeLength) {
				//Если у нас есть this.fixTimeLength, то мы должны остановить логику и просто сделать set на текущих данных
				if (isIn.from && !isIn.fromInset) {
					this.clear()
				} else {
					this.set({ from, to })
				}
			} else if (isInset) {
				//Если выбран слот между краями селекта, то ставим этот слот
				this.set({ from, to })
			} else if (
				Object.values(isEqual)
					.concat(Object.values(isIn))
					.every((v) => !v)
			) {
				switch (options.mode) {
					case 'range': {
						if (betweenDays.isError) {
							this.set({ from, to })
						} else {
							this.push({ from, to })
						}
						break
					}
					default:
						this.set({ from, to })
				}
			} else {
				if (isEqual.tail || isEqual.head) {
					//Если выбран слот по краям, то добавляем
					if (betweenDays.isError) {
						this.set({ from, to })
					} else {
						this.push({ from, to })
					}
				} else {
					if (isEqual.from && isIn.to) {
						//Если выбран крайний слот - обрезаем
						this.shift({
							from: to
						})
					} else if (isEqual.to && isIn.from) {
						//Если выбран крайний слот - обрезаем
						this.shift({
							to: from
						})
					}
				}
			}
		}
	}

	clear() {
		this.set(undefined)
	}
}

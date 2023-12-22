/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Calendar } from '../calendar/index.js'
import type { Cell } from '../cell/index.js'
import dayjs from 'dayjs'

interface ISelectOptions {
	range?: boolean
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
		range: false,
		allowBetweenDays: false,
		minTimeLength: undefined,
		fixTimeLength: undefined
	}
	#selectCount = 0

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

	#selectCountIncrement() {
		this.#selectCount += 1
	}
	#selectCountReset() {
		this.#selectCount = 0
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

		if (this.selected === undefined) {
			this.#selectCountReset()
		} else {
			this.#selectCountIncrement()
		}

		this.on?.set?.(this.selected)
		return this.selected
	}

	pushMiddleware({ from, to }: Partial<Cell>) {
		if (!this.selected) return
		const newSelected = { ...this.selected }

		if (from && +new Date(from) < +newSelected.from) newSelected.from = from
		if (to && +new Date(to) > +newSelected.to) newSelected.to = to

		const isDisallow = from && to && (this.calendar.isDisabled(newSelected).disabled || this.calendar.isBlockDisabled(newSelected).result)
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
				isAnotherTime: boolean
				betweenDays: {
					isBetween: boolean
					isAllow: boolean
					isError: boolean
				}
		  } {
		//@ts-ignore
		if (!this.selected) return

		from = new Date(from)
		to = new Date(to)

		const isEqual = {
			from: +from === +this.selected.from,
			to: +to === +this.selected.to,
			tail: +to === +this.selected.from,
			head: +from === +this.selected.to
		}

		const isIn = {
			from: +from >= +this.selected.from && +from <= +this.selected.to,
			fromInset: +from > +this.selected.from && +from < +this.selected.to,
			to: +to >= +this.selected.from && +to <= +this.selected.to,
			toInset: +to > +this.selected.from && +to < +this.selected.to
		}

		const isDouble = isEqual.from && isEqual.to

		const isInset = !isEqual.from && !isEqual.to && isIn.fromInset && isIn.toInset

		const betweenDays = this.#isBetweenDays({
			from: new Date(Math.min(+this.selected.from, +from)),
			to: new Date(Math.max(+this.selected.to, +to))
		})

		const isAnotherTime = Object.values({ ...isEqual, ...isIn }).every((v) => !v)
		//@ts-ignore
		return {
			isEqual,
			isIn,
			isDouble,
			isInset,
			isAnotherTime,
			betweenDays
		}
	}

	select(
		{ from, to }: Cell,
		_options?: {
			/**
			 * Если true, то мы всегда будем ставить новую дату
			 */
			overload?: boolean
			/**
			 * single: используем обычную логику добавления слотов
			 * range: всегда стараемся ДОБАВИТЬ новые слоты к выбранным
			 */
			mode?: 'single' | 'range'
			/**
			 * Включает, либо отключает поведение options.range
			 */
			manualRange?: boolean
		}
	) {
		const options: typeof _options = {
			mode: 'single',
			overload: false,
			manualRange: false,
			..._options
		}

		if (!options.manualRange) {
			if (this.options.range) {
				if (options.mode !== 'range') {
					//Если range поставил пользователь, то тогда нам не надо набрасывать свою логику
					options.mode = 'range'
					//Если выбор был сделан >= 2 раз, то мы всегда ставим overload = true
					if (this.#selectCount >= 2) {
						options.overload = true
					}
				}
			} else {
				//Если range == false, то мы ВСЕГДА будем ставить новый слот, независимо от того, что хочет пользователь
				options.overload = true
				options.mode = 'single'
			}
		}

		if (options.overload) {
			//Сбрасываем #selectCount, если у нас ставится новая дата
			this.#selectCountReset()
		}

		if (this.selected === undefined) {
			this.set({
				//Если пусто, то ставим "как есть"
				from,
				to
			})
		} else {
			const { isEqual, isIn, isDouble, isInset, betweenDays, isAnotherTime } = this.validate<true>({ from, to })
			if (isDouble) {
				//Если селекты равны, то сбрасываем значение
				this.clear()
			} else if (options.overload) {
				//Ставим всегда новое значение
				this.set({ from, to })
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
			} else if (isAnotherTime) {
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

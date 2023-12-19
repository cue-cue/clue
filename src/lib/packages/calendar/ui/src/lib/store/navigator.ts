import dayjs from 'dayjs'
import { get, writable } from 'svelte/store'
import type { createCalendarOptionsStore } from './options.js'

export interface ICalendarNavigatorStoreData {
	date: Date
	year: {
		current: number
		step: number
	}
	unit: 'date' | 'month' | 'year'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createCalendarNavigatorStore = <TRange extends boolean = boolean>({ options }: { options: ReturnType<typeof createCalendarOptionsStore<TRange>> }) => {
	const { update, subscribe } = writable<ICalendarNavigatorStoreData>({
		date: new Date(),
		year: {
			current: new Date().getFullYear(),
			step: 3 * 4
		},
		unit: 'date'
	})

	const getOptionsData = () => get(options)

	const getStepUnit = () => {
		return getOptionsData().time ? 'week' : 'month'
	}

	const setYearCurrent = (year: number) => {
		const options = getOptionsData()
		console.log(options)
		update((data) => {
			const min = options.min?.getFullYear()
			const max = options.max?.getFullYear()

			if (min && year < min) year = min
			if (max && year > max) year = max

			const isDateExclude = options.isDateExclude(dayjs(dayjs(data.date).year(year).toDate()).year(year).toDate())

			if (isDateExclude.min) {
				year += 1
			}
			if (isDateExclude.max) {
				year -= 1
			}

			data.year.current = year

			return data
		})
	}

	const next = () => {
		update((data) => {
			switch (data.unit) {
				case 'month':
					break
				case 'year': {
					setYearCurrent(data.year.current + data.year.step)
					break
				}
				default:
					data.date = dayjs(data.date).add(1, getStepUnit()).toDate()
			}
			return data
		})
	}
	const prev = () => {
		update((data) => {
			switch (data.unit) {
				case 'month':
					break
				case 'year': {
					setYearCurrent(data.year.current - data.year.step)
					break
				}
				default:
					data.date = dayjs(data.date).add(-1, getStepUnit()).toDate()
			}
			return data
		})
	}
	const setDate = (date: Date) => {
		update((data) => {
			data.date = date
			return data
		})
	}

	const set = (unit: dayjs.UnitType, value: number) => {
		update((data) => {
			data.date = dayjs(data.date).set(unit, value).toDate()
			return data
		})
	}

	const goto = (unit: ICalendarNavigatorStoreData['unit']) => {
		update((data) => {
			switch (unit) {
				case 'year': {
					data.year.current = data.date.getFullYear()
					break
				}
			}

			data.unit = unit
			return data
		})
	}

	return {
		subscribe,
		next,
		prev,
		set,
		setDate,
		goto
	}
}

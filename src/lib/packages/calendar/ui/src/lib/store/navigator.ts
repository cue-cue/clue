import dayjs from 'dayjs'
import { get, writable } from 'svelte/store'
import type { createCalendarOptionsStore } from './options.js'

export interface ICalendarNavigatorStoreData {
	/**
	 * По этому полю мы генерируем дни и время. Всё, что связано дальнейшем выбором date в главном сторе
	 */
	date: Date
	/**
	 * viewDate отличается от date тем, что это поле дает пользователю возможность увидеть то, какую date он может выбрать самостоятельно
	 */
	viewDate: Date
	year: {
		current: number
		step: number
	}
	unit: 'date' | 'month' | 'year'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createCalendarNavigatorStore = <TRange extends boolean = boolean>({
	options,
}: {
	options: ReturnType<typeof createCalendarOptionsStore<TRange>>
}) => {
	const { update, subscribe } = writable<ICalendarNavigatorStoreData>({
		date: new Date(),
		viewDate: new Date(),
		year: {
			current: new Date().getFullYear(),
			step: 3 * 4,
		},
		unit: 'date',
	})

	const getData = () => get({ subscribe })

	const getOptionsData = () => get(options)

	const getStepUnit = () => {
		return getOptionsData().time ? 'week' : 'month'
	}

	const setYearCurrent = (year: number) => {
		const options = getOptionsData()
		update((data) => {
			const min = options.min?.getFullYear()
			const max = options.max?.getFullYear()

			if (min && year < min) year = min
			if (max && year > max) year = max

			const isDateExclude = options.isDateExclude(
				dayjs(dayjs(data.date).year(year).toDate()).year(year).toDate(),
			)

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

	//Прямое присваивание даты навигации
	const set = (value: Date) => {
		update((data) => {
			data.viewDate = data.date = value
			return data
		})
	}

	//Через эту функцию можно безопасно установить дату навигации
	const setView = (value: Date) => {
		update((data) => {
			data.viewDate = value
			//Если time === true, то мы не должны изменять саму дату навигатора
			if (!get(options).time) {
				data.date = data.viewDate
			}
			return data
		})
	}

	const setUnit = (unit: dayjs.UnitType, value: number) => {
		const data = getData()
		setView(dayjs(data.viewDate).set(unit, value).toDate())
	}

	const addUnit = (unit: dayjs.ManipulateType, value: number) => {
		const data = getData()
		setView(dayjs(data.viewDate).add(value, unit).toDate())
	}

	const goto = (unit: ICalendarNavigatorStoreData['unit']) => {
		update((data) => {
			switch (unit) {
				case 'year': {
					data.year.current = data.viewDate.getFullYear()
					break
				}
			}

			data.unit = unit
			return data
		})
	}

	const step = (type: 'next' | 'prev') => {
		const data = getData()

		let yearStep = data.year.step
		let dateUnitStep = 1

		if (type === 'prev') {
			yearStep = yearStep * -1
			dateUnitStep = dateUnitStep * -1
		}

		switch (data.unit) {
			case 'month':
				break
			case 'year': {
				setYearCurrent(data.year.current + yearStep)
				break
			}
			default:
				addUnit(getStepUnit(), dateUnitStep)
		}
	}

	const next = () => {
		step('next')
	}
	const prev = () => {
		step('prev')
	}

	return {
		subscribe,
		next,
		prev,
		setUnit,
		set,
		goto,
	}
}

import dayjs from 'dayjs'
import { writable } from 'svelte/store'
import type { ICalendarStoreData } from './index.js'

export interface ICalendarStoreOptionsData<TRange extends boolean | undefined = boolean> {
	time?: boolean
	range?: TRange
	min?: Date
	max?: Date
	initialData?: Partial<ICalendarStoreData<{ range: TRange }>>
	formats?: Record<'month' | 'year', string>
	on?: Partial<{
		set: (date: ICalendarStoreData<{ range: TRange }>['date']) => void
	}>
}

export interface ICalendarStoreOptionsReactiveMethods {
	isDateExclude: (date: Date) => {
		result: boolean
		min: boolean
		max: boolean
	}
}

export interface ICalendarStoreOptionsEvents<TRange extends boolean> {
	update: (data: ICalendarStoreOptionsData<TRange>) => void
}

export const createCalendarOptionsStore = <TRange extends boolean = boolean>(data?: ICalendarStoreOptionsData<TRange>, on?: Partial<ICalendarStoreOptionsEvents<TRange>>) => {
	const {
		set,
		update: updateStore,
		subscribe
	} = writable({
		range: false,
		time: false,
		min: dayjs().year(1900).startOf('year').toDate(),
		max: dayjs().add(201, 'year').endOf('year').toDate(),
		formats: {
			month: 'MMMM',
			year: 'YYYY'
		},
		isDateExclude(date: Date) {
			const min = this.min && +date < +this.min
			const max = this.max && +date > +this.max
			return {
				result: min || max,
				min,
				max
			}
		},
		...(data || {})
	} as ICalendarStoreOptionsReactiveMethods & typeof data)

	const update = (newData: Partial<typeof data>) => {
		updateStore((data) => {
			const mergedData: typeof data = {
				...data,
				...newData
			}
			on?.update?.(mergedData)
			return mergedData
		})
	}

	return {
		subscribe,
		update,
		set
	}
}

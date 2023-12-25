import dayjs from 'dayjs'
import { writable } from 'svelte/store'
import type { ICalendarStoreData } from './index.js'
import type { ICalendarParams, ISelectOptions } from '@cluue/calendar-core'
import merge from 'lodash.merge'

export interface ICalendarStoreOptionsData<TRange extends boolean | undefined = boolean> {
	time?: boolean
	range?: TRange
	min?: Date
	max?: Date
	initialDate?: Partial<ICalendarStoreData<{ range: TRange }>>['date']
	formats?: Record<'month' | 'year', string>
	on?: Partial<{
		set: (date: ICalendarStoreData<{ range: TRange }>['date']) => void
	}>
	calendar?: ICalendarParams
	select?: Omit<ISelectOptions, 'range'>
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
	const defaultData: ICalendarStoreOptionsData = {
		range: false,
		time: false,
		min: dayjs().year(1900).startOf('year').toDate(),
		max: dayjs().add(201, 'year').endOf('year').toDate(),
		select: {
			allowBetweenDays: true
		},
		formats: {
			month: 'MMMM',
			year: 'YYYY'
		}
	}

	const storeData = {
		...merge(defaultData, data),
		isDateExclude(date: Date) {
			const min = this.min && +date < +this.min
			const max = this.max && +date > +this.max
			return {
				result: min || max,
				min,
				max
			}
		}
	} as ICalendarStoreOptionsReactiveMethods & typeof data

	const { update: updateStore, subscribe } = writable(storeData)

	const update = (newData: Partial<typeof data>) => {
		updateStore((data) => {
			const mergedData = merge(data, newData)
			on?.update?.(mergedData)
			return mergedData
		})
	}

	return {
		subscribe,
		update
	}
}

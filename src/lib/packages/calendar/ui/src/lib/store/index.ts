import { writable, get, type StoresValues } from 'svelte/store'
import { Calendar, Cell, Select } from '@cluue/calendar-core'
import dayjs from 'dayjs'
import { createCalendarOptionsStore, type ICalendarStoreOptionsData } from './options.js'
import { createCalendarNavigatorStore } from './navigator.js'

export interface ICalendarStoreData<TOptions extends Pick<ICalendarStoreOptionsData, 'range'>> {
	date?: TOptions['range'] extends true ? Cell : Date
}

export const createCalendarStore = <TRange extends boolean>(options?: Parameters<typeof createCalendarOptionsStore<TRange>>[0]) => {
	const optionsStore = createCalendarOptionsStore(options)

	const navigator = createCalendarNavigatorStore({
		options: optionsStore
	})

	type Options = StoresValues<typeof optionsStore>
	type Data = ICalendarStoreData<Options>

	const { subscribe, update } = writable<Data>({
		date: undefined,
		...(get(optionsStore)?.initialData as Exclude<typeof options, undefined>['initialData'])
	})

	const calendar = new Calendar()

	const selectInstance = new Select({
		calendar,
		options: {
			allowBetweenDays: true
		},
		on: {
			set(selected) {
				const newDate = (get(optionsStore).range ? selected : selected?.from) as Data['date']

				get(optionsStore)?.on?.set?.(newDate)

				setDate(newDate)
			}
		}
	})

	const setDate = (date: Data['date']) => {
		update((data) => {
			data.date = date
			if (date && date instanceof Date) {
				navigator.setDate(date)
			}
			return data
		})
	}

	const select = (value?: Data['date'] | Cell, selectOptions?: Parameters<typeof selectInstance.select>[1]) => {
		if (!value) return selectInstance.clear()

		const _selectOptions: typeof selectOptions = {
			new: !get(optionsStore).range,
			...selectOptions
		}

		if (value instanceof Date) {
			selectInstance.select(
				new Cell({
					from: value,
					to: dayjs(value).endOf('day').add(1, 'ms').toDate() //+ 1ms для того, чтобы это было начало следующего дня. Как при генерации ячеек (CellList)
				}),
				_selectOptions
			)
		} else {
			selectInstance.select(value, _selectOptions)
		}
	}

	return {
		subscribe,
		select,
		navigator,
		calendar,
		selector: selectInstance,
		options: optionsStore
	}
}

export * from './options.js'

import { writable, get, type StoresValues, derived } from 'svelte/store'
import { Calendar, Cell, Select } from '@cluue/calendar-core'
import dayjs from 'dayjs'
import { createCalendarOptionsStore, type ICalendarStoreOptionsData } from './options.js'
import { createCalendarNavigatorStore } from './navigator.js'

export interface ICalendarStoreData<TOptions extends Pick<ICalendarStoreOptionsData, 'range'>> {
	date?: TOptions['range'] extends true ? Cell : Date
}

export const createCalendarStore = <TRange extends boolean>(options?: Parameters<typeof createCalendarOptionsStore<TRange>>[0]) => {
	const optionsStore = createCalendarOptionsStore(options, {
		update(data) {
			selectInstance.updateOptions({
				...(data.select || {}),
				range: data.range
			})
		}
	})

	const navigator = createCalendarNavigatorStore({
		options: optionsStore
	})

	type Options = StoresValues<typeof optionsStore>
	type Data = ICalendarStoreData<Options>

	const { subscribe, update } = writable<Data>({
		date: undefined
	})

	const calendar = new Calendar(get(optionsStore).calendar)

	const selectInstance = new Select({
		calendar,
		options: {
			...(get(optionsStore).select || {}),
			range: get(optionsStore).range
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
			...selectOptions
		}

		if (value instanceof Date) {
			selectInstance.select(
				new Cell({
					from: dayjs(value).startOf('day').toDate(),
					to: dayjs(value).endOf('day').add(1, 'ms').toDate() //+ 1ms для того, чтобы это было начало следующего дня. Как при генерации ячеек (CellList)
				}),
				_selectOptions
			)
		} else {
			selectInstance.select(value, _selectOptions)
		}
	}

	if (get(optionsStore)?.initialDate) {
		select(get(optionsStore)?.initialDate)
	}

	const isDisabled = derived([optionsStore], () => {
		return (cell: Cell) => calendar.isDisabled(cell)
	})

	return {
		subscribe,
		select,
		isDisabled,
		navigator,
		calendar,
		selector: selectInstance,
		options: optionsStore
	}
}

export * from './options.js'

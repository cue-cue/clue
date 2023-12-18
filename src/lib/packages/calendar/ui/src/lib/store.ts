import { writable, get, type StoresValues } from 'svelte/store'
import { Calendar, Cell, Select } from '@cluue/calendar-core'
import dayjs from 'dayjs'

export interface ICalendarStoreData<TOptions extends Pick<ICalendarStoreOptions, 'range'>> {
	date?: TOptions['range'] extends true ? Cell : Date
	navigatorDate: Date
}

export interface ICalendarStoreOptions<TRange extends boolean | undefined = boolean> {
	time?: boolean
	range?: TRange
	min?: Date
	max?: Date
	initData?: Partial<ICalendarStoreData<{ range: TRange }>>
	on?: Partial<{
		set: (date: ICalendarStoreData<{ range: TRange }>['date']) => void
	}>
}

export const createCalendarOptionsStore = <TRange extends boolean = boolean>(options?: ICalendarStoreOptions<TRange>) => {
	const {
		set,
		update: updateStore,
		subscribe
	} = writable({
		range: false,
		time: false,
		min: new Date(0),
		max: dayjs().add(201, 'year').startOf('year').toDate(),
		...(options || {})
	} as typeof options)

	const update = (newOptions: Partial<typeof options>) => {
		updateStore((data) => ({
			...data,
			...newOptions
		}))
	}

	return {
		subscribe,
		update,
		set
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createCalendarNavigatorStore = ({ options }: { options: ReturnType<typeof createCalendarOptionsStore<any>> }) => {
	const { update, subscribe } = writable({
		date: new Date()
	})

	const getStepUnit = () => {
		return get(options).time ? 'week' : 'month'
	}

	const next = () => {
		update((data) => {
			data.date = dayjs(data.date).add(1, getStepUnit()).toDate()
			return data
		})
	}
	const prev = () => {
		update((data) => {
			data.date = dayjs(data.date).add(-1, getStepUnit()).toDate()
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

	return {
		subscribe,
		next,
		prev,
		set,
		setDate
	}
}

export const createCalendarStore = <TRange extends boolean>(options?: Parameters<typeof createCalendarOptionsStore<TRange>>[0]) => {
	const optionsStore = createCalendarOptionsStore(options)

	type Options = StoresValues<typeof optionsStore>
	type Data = ICalendarStoreData<Options>

	const { subscribe, update } = writable<Data>({
		date: undefined,
		navigatorDate: new Date(),
		...(get(optionsStore)?.initData as Options['initData'])
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
				data.navigatorDate = date
			}
			return data
		})
	}

	const navigator = createCalendarNavigatorStore({
		options: optionsStore
	})

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

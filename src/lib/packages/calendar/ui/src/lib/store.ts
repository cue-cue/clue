import { writable, get } from "svelte/store"
import { Calendar, Cell, Select } from '@cluue/calendar-core'
import dayjs from 'dayjs'

export interface ICalendarStoreData<TOptions extends Pick<ICalendarStoreOptions, 'range'>> {
    date?:TOptions['range'] extends true ? Cell : Date
    navigatorDate:Date
}

export interface ICalendarStoreOptions<TRange extends boolean | undefined = boolean> {
    time?:boolean
    range?:TRange
    min?:Date
    max?:Date
    initData?:Partial<ICalendarStoreData<{range: TRange}>>
    on?: Partial<{
        set: (date:ICalendarStoreData<{range: TRange}>['date']) => void
    }>
}

export const createCalendarStore = <TRange extends ICalendarStoreOptions['range'] = boolean>(_options?:ICalendarStoreOptions<TRange>) => {
    type Options = ICalendarStoreOptions<TRange>
    type Data = ICalendarStoreData<Options>
    
    const options = writable({
        range: false,
        time: false,
        min: new Date(0),
        max: dayjs().add(201, 'year').startOf('year').toDate(),
        ..._options
    } as Options)

    const {subscribe, update} = writable<Data>({
        date: undefined,
        navigatorDate: new Date(),
        ...get(options)?.initData as Options['initData']
    })

    const calendar = new Calendar()

    const selectInstance = new Select({
        calendar,
        options: {
            allowBetweenDays: true,
        },
        on: {
            set(selected) {
                const newDate = (get(options).range ? selected : selected?.from) as Data['date']
                
                get(options)?.on?.set?.(newDate)
                
                setDate(newDate)
            },
        }
    })

    const setDate = (date:Data['date']) => {
        update(data => {
            data.date = date
            if (date && date instanceof Date) {
                data.navigatorDate = date
            }
            return data
        })
    }

    const updateOptions = (newOptions:Partial<ICalendarStoreOptions>) => {
        options.update(data =>({
            ...data,
            ...newOptions
        } as Options))
    }

    const navigator = {
        getStepUnit() {
            return get(options).time ? 'week' : 'month'
        },
        next() {
            update(data => {
                data.navigatorDate = dayjs(data.navigatorDate).add(1, this.getStepUnit()).toDate()
                return data
            })
        },
        prev() {
            update(data => {
                data.navigatorDate = dayjs(data.navigatorDate).add(-1, this.getStepUnit()).toDate()
                return data
            })
        },
        setDate(date:Date) {
            update(data => {
                data.navigatorDate = date
                return data
            })
        },
        set(unit:dayjs.UnitType, value:number) {
            update(data => {
                data.navigatorDate = dayjs(data.navigatorDate).set(unit, value).toDate()
                return data
            })
        }
    }

    const select = (value?:Data['date'], selectOptions?:Parameters<typeof selectInstance.select>[1]) => {
        if (!value) return selectInstance.clear()
        
        const _selectOptions:typeof selectOptions = {
            new: !get(options).range,
            ...selectOptions
        } 

        if (value instanceof Date) {
            selectInstance.select(new Cell({
                from: value,
                to: dayjs(value).endOf('day').add(1, 'ms').toDate() //+ 1ms для того, чтобы это было начало следующего дня. Как при генерации ячеек (CellList)
            }), _selectOptions)
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
        options: {
            update: updateOptions,
            subscribe: options.subscribe
        }
    }
}
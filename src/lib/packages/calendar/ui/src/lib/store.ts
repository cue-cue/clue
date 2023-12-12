import { writable } from "svelte/store"
import { Calendar, Cell, Select } from '@cluue/calendar-core'
import dayjs from 'dayjs'

interface ICalendarStoreData {
    date?:Date
    navigatorDate:Date
}

interface ICalendarStoreOptions {
    initData?:Partial<ICalendarStoreData>
    on?: Partial<{
        set: (date:ICalendarStoreData['date']) => void
    }>
}

export const createCalendarStore = (options?:ICalendarStoreOptions) => {
    const {subscribe, update} = writable<ICalendarStoreData>({
        date: undefined,
        navigatorDate: new Date(),
        ...options?.initData
    })

    const calendar = new Calendar()

    const setDate = (date:ICalendarStoreData['date']) => {
        update(data => {
            data.date = date
            return data
        })
    }

    const selectInstance = new Select({
        calendar,
        on: {
            set(selected) {
                const newDate = selected?.from
                
                options?.on?.set?.(newDate)
                setDate(newDate)
            },
        }
    })

    const navigator = {
        next() {
            update(data => {
                data.navigatorDate = dayjs(data.navigatorDate).add(1, 'month').toDate()
                return data
            })
        },
        prev() {
            update(data => {
                data.navigatorDate = dayjs(data.navigatorDate).add(-1, 'month').toDate()
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
                dayjs().set
                data.navigatorDate = dayjs(data.navigatorDate).set(unit, value).toDate()
                return data
            })
        }
    }

    const select = (date?:Date) => {
        if (!date) return selectInstance.clear()
        
        selectInstance.select(new Cell({
            from: date,
            to: date
        }))
    }

    return {
        subscribe,
        select,
        navigator
    }
}
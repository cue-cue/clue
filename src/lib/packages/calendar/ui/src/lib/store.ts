import { writable } from "svelte/store"
import dayjs from 'dayjs'

interface ICalendarStoreData {
    date:Date
    navigatorDate:Date
} 

export const createCalendarStore = () => {
    const {subscribe, update} = writable<ICalendarStoreData>({
        date: new Date(),
        navigatorDate: new Date()
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
        set(unit:dayjs.UnitType, value:number) {
            update(data => {
                dayjs().set
                data.navigatorDate = dayjs(data.navigatorDate).set(unit, value).toDate()
                return data
            })
        }
    }

    const set = (date:Date) => {
        update(data => {
            data.date = date
            return data
        })
    }

    return {
        subscribe,
        set,
        navigator
    }
}
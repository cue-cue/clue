import dayjs from 'dayjs'

export const dayNumToDate = (day:number) => {
    return dayjs().set('day', day).toDate()
}

export const dayStringToDate = (day:string) => {
    const days = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa']
    return dayNumToDate(days.findIndex(d => d === day.toLowerCase().trim()))
}

export const dayToDate = (day:number | string) => {
    switch (typeof day) {
        case 'number': {
            return dayNumToDate(day)
        }
        default: return dayStringToDate(day)
    }
}

export const dateToDayNum = (date:Date) => {
    return dayjs(date).day()
}

export const dateToDayString = (date:Date) => {
    return dayjs(date).locale('en').format('dd').toLowerCase()
}

export const dateToDay = (date:Date, type:'string' | 'number') => {
    switch (type) {
        case 'number': return dateToDayNum(date)
        default: return dateToDayString(date)
    }
}
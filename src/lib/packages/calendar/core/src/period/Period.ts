import { dateToDay, dateToDayNum, dayToDate } from "./utils";

export type PeriodDay = Date | string | number
export interface IPeriodParams {
    days:PeriodDay[]
    start:number
    end:number
}

export class Period {
    days
    start
    end
    constructor({
        days,
        start,
        end
    }:IPeriodParams) {
        this.days = days
        this.start = start
        this.end = end
    }

    private anyDayToNum = (day:PeriodDay) => {
        switch (typeof day) {
            case 'number': return day
            case 'string': return dateToDayNum(dayToDate(day))
            default: return dateToDay(day, 'number')
        }
    }

    check(date:Date) {
        if (!date) return false

        date = new Date(date)

        const dateNum = this.anyDayToNum(date)
        const dateMinutes = date.getHours() * 60 + date.getMinutes()
        const isDay = this.days.map(day => this.anyDayToNum(day)).includes(dateNum)
        const isTime = dateMinutes >= +this.start && dateMinutes <= +this.end

        return isDay && isTime
    }
    
    checkMany(dates:Date[]) {
        return dates.every(date => this.check(date))
    }
}
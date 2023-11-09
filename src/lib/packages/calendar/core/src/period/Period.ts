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

    checkDay(date:Date) {
        return this.days.map(day => this.anyDayToNum(day)).includes(this.anyDayToNum(date))
    }

    checkTime(date:Date) {
        const dateMinutes = date.getHours() * 60 + date.getMinutes()
        return dateMinutes >= +this.start && dateMinutes <= +this.end
    }

    check(date:Date) {
        return this.checkDay(date) && this.checkTime(date)
    }
    
    checkMany(dates:Date[]) {
        return dates.every(date => this.check(date))
    }
}
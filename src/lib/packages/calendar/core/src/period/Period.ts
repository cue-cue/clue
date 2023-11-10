import { dateToDay, dateToDayNum, dayToDate } from "./utils";
import type { Cell } from '../cell';
import { getAllMinutesByDate } from '$lib/packages/calendar/utils/src';

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

    checkDay(cellOrDate:Cell | Date) {
        const dayNumbers = this.days.map(day => this.anyDayToNum(day))
        const check = (date:Date) => dayNumbers.includes(this.anyDayToNum(date))
        if (cellOrDate instanceof Date) {
            return check(cellOrDate)
        }
        return check(cellOrDate.from) || check(cellOrDate.to)
    }

    isTimeDisabled(date:Date) {
        const dateMinutes = getAllMinutesByDate(date)
        return dateMinutes >= +this.start && dateMinutes <= +this.end
    }

    check(date: Date) {
        const isTime = this.isTimeDisabled(date)
        if (!isTime) return false

        const isDay = this.checkDay(date)

        return isDay && isTime
    }
    
    checkMany(dates:Date[]) {
        return dates.every(date => this.check(date))
    }
}
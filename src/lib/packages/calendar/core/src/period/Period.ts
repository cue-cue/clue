import { dateToDay, dateToDayNum, dayToDate } from "./utils.js";
import type { Cell } from '../cell/index.js';
import { getAllMinutesByDate } from '@cluue/calendar-utils';

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

    isTimeExclude(time:Date) {
        const dateMinutes = getAllMinutesByDate(time)
        return dateMinutes >= +this.start && dateMinutes <= +this.end
    }

    isTimeInclude(time:Date) {
        if (this.start === this.end) return false
        const dateMinutes = getAllMinutesByDate(time)
        return this.start <= dateMinutes && this.end >= dateMinutes
    }

    isDateInclude(date:Date) {
        if (!this.checkDay(date)) return false
        return this.isTimeInclude(date)
    }

    isCellInclude(cell:Cell) {
        return this.isDateInclude(cell.from) || this.isDateInclude(new Date(+cell.to - 1))
    }

    isExclude(date: Date) {
        const isTime = this.isTimeExclude(date)
        if (!isTime) return false

        const isDay = this.checkDay(date)

        return isDay && isTime
    }
    
    isExcludeMany(dates:Date[]) {
        return dates.every(date => this.isExclude(date))
    }
}
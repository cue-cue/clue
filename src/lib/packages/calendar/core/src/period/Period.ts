import dayjs from 'dayjs'
import { Disabled } from "../disabled";
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

    private getDisabledInstance = (date:Date) => {
        return new Disabled({
            from: dayjs(date).startOf('day').add(this.start, 'minutes').toDate(),
            to: dayjs(date).startOf('day').add(this.end, 'minutes').toDate()
        })
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
        return this.getDisabledInstance(date).isDisabled(date)
    }

    check(date:Date) {
        return this.checkDay(date) && this.checkTime(date)
    }
    
    checkMany(dates:Date[]) {
        return dates.every(date => this.check(date))
    }
}
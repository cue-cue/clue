import dayjs from 'dayjs'
import { Disabled } from "../disabled";
import { dateToDay, dateToDayNum, dayToDate } from "./utils";
import type { Cell } from '../cell';

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

    private getDisabledInstance = (cellOrDate:Cell | Date) => {
        return new Disabled({
            from: cellOrDate instanceof Date ? cellOrDate : dayjs(cellOrDate.from).startOf('day').add(this.start, 'minutes').toDate(),
            to: cellOrDate instanceof Date ? cellOrDate : dayjs(cellOrDate.to).startOf('day').add(this.end, 'minutes').toDate()
        })
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

    checkTime(cellOrDate:Cell | Date) {
        return this.getDisabledInstance(cellOrDate).isDisabled(cellOrDate)
    }

    check(cellOrDate:Cell | Date) {
        return this.checkDay(cellOrDate) && this.checkTime(cellOrDate)
    }
    
    checkMany(cellOrDate:(Cell | Date)[]) {
        return cellOrDate.every(c => this.check(c))
    }
}
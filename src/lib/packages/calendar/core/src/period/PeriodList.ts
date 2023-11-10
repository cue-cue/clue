import dayjs from 'dayjs'
import { getAllMinutesByDate } from "@cluue/calendar-utils";
import { CellList, type Cell } from "../cell";
import type { Period } from "./Period";

export class PeriodList {
    items
    constructor(items:Period[]) {
        this.items = items
    }


    check(cellOrDate:Cell | Date, step = 15) {
        if (cellOrDate instanceof Date) return this.isExclude(cellOrDate)
        const cellList = new CellList({
            step,
            date: dayjs(cellOrDate.from).startOf('day').toDate(),
            start: getAllMinutesByDate(cellOrDate.from),
            end: getAllMinutesByDate(cellOrDate.from) + ((+cellOrDate.to - +cellOrDate.from) / 1000 / 60),
        })
        return cellList.cells.some(cell => this.isExclude(cell))
    }

    isExclude(cellOrDate:Cell | Date) {
        if (this.items && this.items?.length) {
            const isDate = cellOrDate instanceof Date
            let dateTo = isDate ? cellOrDate : cellOrDate.to
            dateTo = new Date(+dateTo - 1) //What? Надо для того, чтобы втягивать в себя крайние слоты справа
            const periodFrom = this.items.some(period => period.check(isDate ? dateTo : cellOrDate.from))
            const periodTo = this.items.some(period => period.check(dateTo))
            return !periodFrom || !periodTo
        }
        return false
    }
}
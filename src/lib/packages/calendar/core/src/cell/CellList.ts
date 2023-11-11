import dayjs from "dayjs"
import { Cell } from "."
import { Period, PeriodList } from "../period"

export class CellList {
    cells
    step
    start
    end
    date
    periods
    constructor({
        step = 15,
        start =  0,
        end = 1440,
        date,
        periods = []
    }:{
        step?:number
        start?:number
        end?:number
        date:Date
        periods?:Period[]
    }) {
        this.periods = periods
        this.step = step
        this.start = start
        this.end = end - (end % this.step) //normalize by step
        this.date = dayjs(date).startOf('day')
        this.cells = this.genCells()
    }

    static sort(cells:Cell[]) {
        return cells.sort((a,b) => {
            return +a.from - +b.from
        })
    }

    static cutByPeriods(cells:Cell[], periods:Period[]) {
        if (!periods.length) return cells
        return cells.filter(cell => {
            const cellDateTo = new Date(+cell.to - 1)
            const {end, start} = new PeriodList(periods).getSides([cell.to])

            return !(start.isExclude(cellDateTo) || end.isExclude(cellDateTo))
        })
    }

    applyDate(minutes:number) {
        return new Date(+this.date + minutes * 60000)
    }

    genCell(minutes:number) {
        return new Cell({
            from: this.applyDate(minutes),
            to: this.applyDate(minutes + this.step)
        })
    }
    
    genCells() {
        const cells:Cell[] = []
        for (let i = this.start; i < this.end; i += this.step) {
            cells.push(this.genCell(i))
        }
        return CellList.sort(CellList.cutByPeriods(cells, this.periods))
    }
}
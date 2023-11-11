import dayjs from "dayjs"
import { Cell } from "./Cell.js"
import { Period, PeriodList } from "../period/index.js"

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

        const sidesMap = new Map<number, ReturnType<PeriodList['getSides']>>()

        return cells.filter(cell => {
            const cellDay = dayjs(cell.from).startOf('day').toDate()
            const sideFromMap = sidesMap.get(+cellDay)

            const {start, end} = sideFromMap ?? new PeriodList(periods).getSides([cellDay])

            if (!sideFromMap) {
                sidesMap.set(+cellDay, {start, end})
            }

            return !(start.isCellInclude(cell) || end.isCellInclude(cell))
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
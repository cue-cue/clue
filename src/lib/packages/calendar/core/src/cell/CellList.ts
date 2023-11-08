import dayjs from "dayjs"
import { Cell } from "."

export class CellList {
    cells
    step
    start
    end
    date
    constructor({
        step = 15,
        start =  0,
        end = 1440,
        date
    }:{
        step?:number
        start?:number
        end?:number
        date:Date
    }) {
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
        return CellList.sort(cells)
    }
}
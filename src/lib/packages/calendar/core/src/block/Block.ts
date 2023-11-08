import cloneDeep from 'lodash.clonedeep'
import { Cell, CellList } from "../cell";

export interface IBlockParams extends Cell {
    drift?: {
        before?: Date,
        after?: Date
    }
}

export class Block extends Cell {
    drift
    constructor({from,to, drift}:IBlockParams) {
        super({from, to})
        this.drift = this.createDrift(drift)
        
    }
    static addToCellList(eventCells:Block[], cellList:Cell[]):Array<typeof eventCells[number] | typeof cellList[number]> {
        const replacedEvents:typeof eventCells = []

        const cellListDates = {
            min: new Date(Math.min(...cellList.map(({from}) => +from))),
            max: new Date(Math.max(...cellList.map(({to}) => +to))),
        }

        const normalizedEventCells = eventCells.map(eventCell => {
            const clone = cloneDeep(eventCell)
            if (+clone.from < +cellListDates.min) {
                clone.from = cellListDates.min
            }
            if (+clone.to > +cellListDates.max) {
                clone.to = cellListDates.max
            }
            return clone
        })

        const result = cellList.filter(cell => {
            const event = normalizedEventCells.find(event => {
                return +cell.from >= +event.from && +cell.to <= +event.to
            })

            if (event) {
                if (replacedEvents.findIndex(replacedEvent => replacedEvent === event) === -1) {
                    replacedEvents.push(event)
                }
            }

            return !event
        })

        return CellList.sort([...result, ...replacedEvents])
    }

    private createDrift(driftData:IBlockParams['drift']) {
        const {before, after} = driftData || {}
        return {
            before: before && new Cell({from: before, to: this.from}),
            after: after && new Cell({from: this.to, to: after})
        }
    }
    
    getDatesWithDrift() {
        let {from, to} = this

        if (!this.drift) return

        if (this.drift.before && +from > +this.drift.before.from) {
            from = new Date(+this.drift.before)
        }

        if (this.drift.after && +to < +this.drift.after.to) {
            to = new Date(+this.drift.after)
        }

        return {
            from,
            to
        }
    }
}
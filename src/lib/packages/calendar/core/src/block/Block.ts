import dayjs from 'dayjs'
import cloneDeep from 'lodash.clonedeep'
import { Cell, CellList } from "../cell/index.js";

export interface IBlockParams extends Cell {
    drift?: {
        before?: Date | number,
        after?: Date | number
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

        const beforeDate = before ? before instanceof Date ? before : dayjs(this.from).add(-before, 'minutes').toDate() : undefined
        const afterDate = after ? after instanceof Date ? after : dayjs(this.to).add(after, 'minutes').toDate() : undefined
        
        return {
            before: beforeDate && new Cell({from: beforeDate, to: this.from}),
            after: afterDate && new Cell({from: this.to, to: afterDate})
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
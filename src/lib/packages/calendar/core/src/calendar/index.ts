import { Timezone } from '@cluue/calendar-utils'
import { CellList, type Cell, type ICellParams } from "../cell";
import type { Block } from "../block";
import { DisabledList, Disabled, type IDisabledParams } from "../disabled";
import { PeriodList, type Period } from '../period';

interface ICalendarParams<T extends Block[] = Block[]> {
    disabled?:Parameters<Calendar['setDisabled']>[0]
    step?:number
    deadLine?:'current'
    timezone?:string
    deadLineOptions?:{
        lazy?:boolean
        include?:Disabled['include'],
        add?:number//ms
    },
    periods?:Calendar<T>['periods']
    blocks?:Calendar<T>['blocks']
}
export class Calendar<T extends Block[] = Block[]> {
    disabled:Disabled[] = []
    step
    timezone
    deadLine
    deadLineOptions
    periods!: Period[]
    #periodList!: PeriodList
    blocks!: T
    #blocksDisabledList!: DisabledList<T>

    constructor({
        disabled = [],
        step = 5,
        timezone,
        deadLine,
        deadLineOptions,
        periods = [],
        blocks,
    }:ICalendarParams<T> = {}) {
        this.step = step
        this.deadLine = deadLine
        this.timezone = timezone
        this.deadLineOptions = deadLineOptions
        this.setBlocks(blocks)
        this.setDisabled(disabled)
        this.setPeriods(periods)
    }

    setBlocks(blocks:ICalendarParams<T>['blocks']) {
        this.blocks = blocks || ([] as unknown as T)
        this.#blocksDisabledList = new DisabledList(this.blocks)
        return this.blocks
    }

    setDisabled(disabled:IDisabledParams[]) {
        return this.disabled = disabled.map(item => new Disabled(item))
    }

    setPeriods(periods:Calendar['periods']) {
        this.periods = periods
        this.#periodList = new PeriodList(this.periods)
        return this.periods
    }

    isPeriodDisabled(cellOrDate:ICellParams | Date, hard = true) {
        if (hard) {
            return this.#periodList.check(cellOrDate, this.step)
        }
        return this.#periodList.isExclude(cellOrDate)
    }

    createCellList(data:Omit<ConstructorParameters<typeof CellList>[0], 'step'>) {
        return new CellList({
            step: this.step,
            ...data
        })
    }

    getDeadLineDate() {
        let date = new Date()
        if (this.timezone) {
            date = new Timezone(date, this.timezone).apply()
        }
        
        date = new Date(+date + (this.deadLineOptions?.add || 0))

        return date
    }

    isDeadLine(cellOrDate:Parameters<Disabled['isDisabled']>[0]) {
        switch (this.deadLine) {
            case 'current': {
                const disabled = new Disabled({
                    to: this.getDeadLineDate(),
                    include: this.deadLineOptions?.include || '[]'
                })
                if (this.deadLineOptions?.lazy && !(cellOrDate instanceof Date)) {
                    return disabled.isDisabled(cellOrDate.to)
                }
                return disabled.isDisabled(cellOrDate)
            }
            default: return false
        } 
    }

    
    isBlockDisabled(cell:Cell) {
        return this.#blocksDisabledList.isDisabled(cell)
    }
    
    isDisabled(cellOrDate:Parameters<Disabled['isDisabled']>[0]) {
        const deadLine = this.isDeadLine(cellOrDate)
        const findDisabledListItem = (options?:Parameters<Disabled['isDisabled']>[1]) => this.disabled.find(d => d.isDisabled(cellOrDate, options))
        const disabledListItem = findDisabledListItem()
        const periodDisabled = this.isPeriodDisabled(cellOrDate)
        const disabled = deadLine || !!disabledListItem || periodDisabled
        return {
            disabled,
            deadLine,
            disabledListItem,
            findDisabledListItem,
            disabledList: !!disabledListItem,
            periodDisabled
        }
    }
}
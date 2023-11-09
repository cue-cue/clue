import { Timezone } from '@cluue/calendar-utils'
import type { Cell, ICellParams } from "../cell";
import type { Block } from "../block";
import { DisabledList, Disabled, type IDisabledParams } from "../disabled";
import type { Period } from '../period';

interface ICalendarParams<T extends Block[] = Block[]> {
    disabled?:Parameters<Calendar['setDisabled']>[0]
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
    timezone
    deadLine
    deadLineOptions
    periods!: Period[]
    blocks!: T
    #blocksDisabledList!: DisabledList<T>

    constructor({
        disabled = [],
        timezone,
        deadLine,
        deadLineOptions,
        periods = [],
        blocks,
    }:ICalendarParams<T> = {}) {
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
        return this.periods = periods
    }

    isPeriodDisabled(cellOrDate:ICellParams | Date) {
        if (this.periods && this.periods?.length) {
            const isDate = cellOrDate instanceof Date
            let dateTo = isDate ? cellOrDate : cellOrDate.to
            dateTo = new Date(+dateTo - 1) //What? Надо для того, чтобы втягивать в себя крайние слоты справа
            const periodFrom = this.periods.some(period => period.check(isDate ? dateTo : cellOrDate.from))
            const periodTo = this.periods.some(period => period.check(dateTo))
            return !periodFrom || !periodTo
        }
        return false
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
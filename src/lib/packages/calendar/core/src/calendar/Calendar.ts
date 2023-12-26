import { Timezone } from '@cluue/calendar-utils'
import { CellList, type Cell, type ICellParams } from '../cell/index.js'
import type { Block } from '../block/index.js'
import { DisabledList, Disabled } from '../disabled/index.js'
import { PeriodList, type Period } from '../period/index.js'

export interface ICalendarParams<T extends Block[] = Block[]> {
	disabled?: Parameters<Calendar['setDisabled']>[0]
	step?: number
	deadLine?: 'current'
	timezone?: string
	deadLineOptions?: {
		lazy?: boolean
		include?: Disabled['include']
		add?: number //ms
	}
	periods?: Calendar<T>['periods']
	blocks?: Calendar<T>['blocks']
}
export class Calendar<T extends Block[] = Block[]> {
	disabled: Disabled[] = []
	#disabledList!: DisabledList<Disabled[]>
	step
	timezone
	deadLine
	deadLineOptions
	periods!: Period[]
	#periodList!: PeriodList
	blocks!: T
	#blocksDisabledList!: DisabledList

	constructor({
		disabled = [],
		step = 5,
		timezone,
		deadLine,
		deadLineOptions,
		periods = [],
		blocks,
	}: ICalendarParams<T> = {}) {
		this.step = step
		this.deadLine = deadLine
		this.timezone = timezone
		this.deadLineOptions = deadLineOptions
		this.setBlocks(blocks)
		this.setDisabled(disabled)
		this.setPeriods(periods)
	}

	setBlocks(blocks: ICalendarParams<T>['blocks']) {
		this.blocks = blocks || ([] as unknown as T)
		this.#blocksDisabledList = new DisabledList(
			this.blocks.map((block) => block.getCellWithDrift()),
		)
		return this.blocks
	}

	setDisabled(disabled?: Disabled[]) {
		this.disabled = disabled || []
		this.#disabledList = new DisabledList(this.disabled)

		return this.disabled
	}

	setPeriods(periods?: Calendar['periods']) {
		this.periods = periods || []
		this.#periodList = new PeriodList(this.periods)
		return this.periods
	}

	isPeriodDisabled(cellOrDate: ICellParams | Date) {
		return this.#periodList.isExclude(cellOrDate)
	}

	createCellList(data: Omit<ConstructorParameters<typeof CellList>[0], 'step'>) {
		return new CellList({
			step: this.step,
			periods: this.periods,
			...data,
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

	isDeadLine(cellOrDate: Parameters<Disabled['isDisabled']>[0]) {
		switch (this.deadLine) {
			case 'current': {
				const disabled = new Disabled({
					to: this.getDeadLineDate(),
					include: this.deadLineOptions?.include || '[]',
				})
				if (this.deadLineOptions?.lazy && !(cellOrDate instanceof Date)) {
					return disabled.isDisabled(cellOrDate.to)
				}
				return disabled.isDisabled(cellOrDate)
			}
			default:
				return false
		}
	}

	isBlockDisabled(cellOrDate: Cell | Date) {
		return this.#blocksDisabledList.isDisabled(cellOrDate)
	}

	isDisabled(cellOrDate: Parameters<Disabled['isDisabled']>[0]) {
		const deadLine = this.isDeadLine(cellOrDate)

		const disabledListResult = this.#disabledList.isDisabled(cellOrDate)
		const findDisabledListItem = disabledListResult.findItem
		const disabledListItem = disabledListResult.item

		const blockResult = this.isBlockDisabled(cellOrDate)
		const findBlockItem = blockResult.findItem
		const blockItem = blockResult.item

		const periodDisabled = this.isPeriodDisabled(cellOrDate)
		const disabled =
			deadLine || disabledListResult.result || periodDisabled || blockResult.result
		return {
			disabled,
			deadLine,

			disabledListItem,
			findDisabledListItem,
			disabledList: disabledListResult.result,

			findBlockItem,
			blockItem,
			block: blockResult.result,

			periodDisabled,
		}
	}
}

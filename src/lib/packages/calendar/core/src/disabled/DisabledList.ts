import type { Cell } from '../cell/index.js'
import { Disabled } from './Disabled.js'

export class DisabledList<T extends (Cell | Disabled)[] = Cell[]> {
	list
	items

	constructor(items: T) {
		this.items = items
		this.list = this.createList(this.items)
	}

	createList(items: DisabledList<T>['items']) {
		return items.map((item) => {
			return {
				item,
				disabled: item instanceof Disabled ? item : new Disabled(item)
			}
		})
	}

	isDisabled(cellOrDate: Parameters<Disabled['isDisabled']>[0]) {
		const findItem = (options?: Parameters<Disabled['isDisabled']>[1]) =>
			this.list.find(({ disabled }) => disabled.isDisabled(cellOrDate, options))
		const { item } = findItem() || {}
		return {
			result: !!item,
			item,
			findItem
		}
	}
}

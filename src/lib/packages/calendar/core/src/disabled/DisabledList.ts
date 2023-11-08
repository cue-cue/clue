import type{ Cell } from "../cell";
import { Disabled } from "./Disabled";

export class DisabledList<T extends Cell[]> {
    list
    items

    constructor(items:T) {
        this.items = items
        this.list = this.createList(this.items)
    }

    createList(items:DisabledList<T>['items']) {
        return items.map(item => {
            return {
                item,
                disabled: new Disabled(item)
            }
        })
    }

    isDisabled(cell:Cell) {
        const findItem = () => this.list.find(({disabled}) => disabled.isDisabled(cell))
        const {item} = findItem() || {}
        return {
            result: !!item,
            item,
            findItem
        }
    }
}
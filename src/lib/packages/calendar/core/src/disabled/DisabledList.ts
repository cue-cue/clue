import type{ Cell } from "../cell/index.js";
import { Disabled } from "./Disabled.js";

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

    isDisabled(cellOrDate:Parameters<Disabled['isDisabled']>[0]) {
        const findItem = () => this.list.find(({disabled}) => disabled.isDisabled(cellOrDate))
        const {item} = findItem() || {}
        return {
            result: !!item,
            item,
            findItem
        }
    }
}
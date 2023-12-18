import type { Calendar, Cell } from "../index.js";
import { Disabled } from "./Disabled.js";

type MergeDisabled<T = Disabled[]> = (
    disabledArray:T,
    cells:Cell[],
    calendar: Calendar,
    options?: {
        minLength?:number
    }
) => T

export const mergeDisabled:MergeDisabled = (disabledArray, cells, calendar, options) => {
    const add:typeof disabledArray = []
    const _options:Required<typeof options> = {
        minLength: 0,
        ...options
    }
    let bubble:Cell | undefined = undefined
    let isNew = true
    const addBubble = () => {
        isNew = true
        if (bubble) {
            if ((+(bubble.to || 0) - +(bubble.from || 0)) / 60000 < _options.minLength) {
                add.push(new Disabled(bubble))
                bubble = undefined
            }
        }
    }
    cells.forEach(slot => {
        const isDisabled = calendar.isDisabled(slot).disabled
        const expand = () => bubble && (bubble.to = slot.from)
        if (!isDisabled) {
            if (isNew) {
                isNew = false
                bubble = {...slot}
            } else {
                expand()
            }
        } else {
            if (!isNew) {
                expand()
                addBubble()
            }
        }
    })
    return [...disabledArray, ...add]
}
import cloneDeep from "lodash.clonedeep";
import type { Cell } from "../cell/index.js";
import type { Block } from "./Block.js";
import { DisabledList } from "../disabled/index.js";
import { mergeCells } from "../cell/utils.js";

export type AddToCellList = <T extends Block[], U extends Cell[]>(blocks:T, cells:U, options?:{
    driftReplacer: (data:{
        cell:Cell,
    }) => Cell
}) => Array<T[number] | U[number]>

export const addToCellList:AddToCellList = (blocks, cells, options) => {
    const blocksDisabledList = new DisabledList(blocks)

    const normalizedDriftList = blocks.map(({drift}) => {
        const beforeClone = cloneDeep(drift.before)
        const afterClone = cloneDeep(drift.after)

        if (beforeClone) {
            const block = blocksDisabledList.isDisabled(beforeClone)
            if (block.item?.to) {
                beforeClone.from = block.item?.to
            }
        }

        if (afterClone) {
            const block = blocksDisabledList.isDisabled(afterClone)
            if (block.item?.from) {
                afterClone.to = block.item?.from
            }
        }

        return {
            before: beforeClone,
            after: afterClone
        }
    })

    const driftCells = normalizedDriftList.reduce<Cell[]>((val, drift) => {
        Object.values(drift).forEach(cell => {
            if (cell) {
                const replacedCell = options?.driftReplacer?.({cell}) ?? cell
                val.push(replacedCell)
            }
        })
        return val
    }, [])

    return mergeCells([...blocks, ...driftCells], cells)
}
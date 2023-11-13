import cloneDeep from "lodash.clonedeep";
import { Cell, CellList } from "../cell";
import type { Block } from "./Block";
import { DisabledList } from "../disabled";

export const addToCellList = (blocks:Block[], cellList:Cell[]) => {
    const cellListDates = {
        min: new Date(Math.min(...cellList.map(({ from }) => +from))),
        max: new Date(Math.max(...cellList.map(({ to }) => +to))),
    };

    const cutSides = (cell:Cell) => {
        const clone = cloneDeep(cell)
        if (+clone.from < +cellListDates.min) {
            clone.from = cellListDates.min;
        }
        if (+clone.to > +cellListDates.max) {
            clone.to = cellListDates.max;
        }
        return clone
    }

    const normalizedBlocks = blocks.map(block => {
        return cutSides(block);
    });

    const blocksDisabledList = new DisabledList(normalizedBlocks)

    const driftList = blocks.map(({drift}) => drift)

    const normalizedDriftList = driftList.map(({before, after}) => {
        const beforeClone = cloneDeep(before)
        const afterClone = cloneDeep(after)

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
    }).map(({before, after}) => ({
        before: before && cutSides(before),
        after: after && cutSides(after)
    }))

    const driftCells = normalizedDriftList.reduce<Cell[]>((val, drift) => {
        Object.values(drift).forEach(cell => {
            if (cell) {
                val.push(cell)
            }
        })
        return val
    }, [])

    const replacedCells:Cell[] = [];

    const cells = cellList.filter(cell => {
        const block = [...normalizedBlocks, ...driftCells].find(block => {
            return +cell.from >= +block.from && +cell.to <= +block.to;
        });
        if (block) {
            if (replacedCells.findIndex(replacedCell => replacedCell === block) === -1) {
                replacedCells.push(block);
            }
        }
        return !block;
    });

    const result = CellList.sort([...cells, ...replacedCells])

    return result
}
import cloneDeep from "lodash.clonedeep";
import type { Cell } from "./Cell.js";

export const sortCells = (cells:Cell[]) => cells.sort((a,b) => +a.from - +b.from)

export const mergeCells = <T extends Cell[], U extends Cell[]>(fromCells:T, toCells:U) => {
    const toCellsDates = {
        min: new Date(Math.min(...toCells.map(({ from }) => +from))),
        max: new Date(Math.max(...toCells.map(({ to }) => +to))),
    };

    const cutSides = (cell:Cell) => {
        const clone = cloneDeep(cell)
        if (+clone.from < +toCellsDates.min) {
            clone.from = toCellsDates.min;
        }
        if (+clone.to > +toCellsDates.max) {
            clone.to = toCellsDates.max;
        }
        return clone
    }

    const normalizedFromCells = fromCells.map(cell => cutSides(cell));

    const replacedCells:Cell[] = [];

    const cells = toCells.filter(toCell => {
        const cell = normalizedFromCells.find(cell => {
            return +toCell.from >= +cell.from && +toCell.to <= +cell.to;
        });
        if (cell) {
            if (replacedCells.findIndex(replacedCell => replacedCell === cell) === -1) {
                replacedCells.push(cell);
            }
        }
        return !cell;
    });

    return sortCells([...cells, ...replacedCells]) as unknown as Array<T[number] | U[number]>
}
import dayjs from 'dayjs'
import cloneDeep from 'lodash.clonedeep'
import type { Cell } from './Cell.js'
import { DisabledList } from '../index.js'

export const sortCells = (cells: Cell[]) => cells.sort((a, b) => +a.from - +b.from)

export const cutCellsByMinMax = (cells: Cell[], min: Date, max: Date) => {
	return cells.map((cell: Cell) => {
		const clone = cloneDeep(cell)
		if (+clone.from < +min) {
			clone.from = min
		}
		if (+clone.to > +max) {
			clone.to = max
		}
		return clone
	})
}

export const cutCellsBySides = (cells: Cell[], dates: Date[]) => {
	const datesTimes = dates.map((date) => +date)
	const minMaxOfDates = {
		min: new Date(Math.min(...datesTimes)),
		max: new Date(Math.max(...datesTimes))
	}

	const sidesOfDates = {
		from: dayjs(minMaxOfDates.min).startOf('day').toDate(),
		to: dayjs(minMaxOfDates.max).endOf('day').add(1, 'ms').toDate()
	}

	const isDateIncludeIntoSides = (date: Date) => {
		return +date >= +sidesOfDates.from && +date <= +sidesOfDates.to
	}

	const result = cells.filter(
		(cell) => isDateIncludeIntoSides(cell.from) || isDateIncludeIntoSides(cell.to)
	)

	return cutCellsByMinMax(result, sidesOfDates.from, sidesOfDates.to)
}

export const mergeCells = <T extends Cell[], U extends Cell[]>(fromCells: T, toCells: U) => {
	const croppedFromCells = cutCellsBySides(
		fromCells,
		toCells.map(({ from, to }) => [from, to]).flat()
	)

	const croppedFromCellsDisabled = new DisabledList(croppedFromCells)

	const cells = toCells.filter((toCell) => !croppedFromCellsDisabled.isDisabled(toCell).result)

	return sortCells([...croppedFromCells, ...cells]) as unknown as Array<T[number] | U[number]>
}

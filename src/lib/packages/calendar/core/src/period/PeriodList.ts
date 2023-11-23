import { getDatesBetweenRange } from '@cluue/calendar-utils'
import type { Cell } from '../cell/index.js'
import { Period } from './Period.js'

export class PeriodList {
	items
	constructor(items: Period[]) {
		this.items = items
	}

	getSides(days: Date[]) {
		const periods = this.items.filter(
			(period) => days.findIndex((day) => period.checkDay(day)) !== -1
		)

		const start = new Period({
			days,
			start: 0,
			end: Math.min(...periods.map(({ start }) => start))
		})

		const end = new Period({
			days,
			start: Math.max(...periods.map(({ end }) => end)),
			end: 1440
		})

		return {
			start,
			end
		}
	}

	findExcludeInRange(cell: Cell) {
		const periods = this.findPeriodsInRange(cell)
		const allStart: number[] = []
		const allEnd: number[] = []

		periods.forEach((period) => {
			allStart.push(period.start)
			allEnd.push(period.end)
		})

		if (periods.length < 2) return false //Если периодов меньше 2, то и "разрывов" быть не может

		return !allStart.every((start) => {
			//Проверяем, что нет "разрывов" между режимами работы
			return (
				allEnd.findIndex((_end) => {
					const end = _end === 1440 ? 0 : _end
					return end === start
				}) !== -1
			)
		})
	}

	findPeriodsInRange(cell: Cell) {
		//Ищем периоды под каждый день
		const allDates = getDatesBetweenRange(cell.from, cell.to)
		const periods: Period[] = []

		allDates.forEach((date) => {
			this.items.forEach((period) => {
				const isDate = period.checkDay(date)
				const isInclude = period.isDateInclude(cell.from) || period.isDateInclude(cell.to)

				if (isDate && isInclude) {
					periods.push(period)
				}
			})
		})

		return periods
	}

	// check(cellOrDate:Cell | Date, step = 15) {
	//     if (cellOrDate instanceof Date) return this.isExclude(cellOrDate)
	//     const cellList = new CellList({
	//         step,
	//         date: dayjs(cellOrDate.from).startOf('day').toDate(),
	//         start: getAllMinutesByDate(cellOrDate.from),
	//         end: getAllMinutesByDate(cellOrDate.from) + ((+cellOrDate.to - +cellOrDate.from) / 1000 / 60),
	//     })
	//     return cellList.cells.some(cell => this.isExclude(cell))
	// }

	isExcludeLite(cellOrDate: Cell | Date) {
		//Простая версия для проверки. Подходит для 1 слота и для даты
		if (this.items && this.items?.length) {
			const isDate = cellOrDate instanceof Date
			let dateTo = isDate ? cellOrDate : cellOrDate.to

			dateTo = new Date(+dateTo - 1) //What? Надо для того, чтобы втягивать в себя крайние слоты справа

			const periodFrom = this.items.some((period) =>
				period.isExclude(isDate ? dateTo : cellOrDate.from)
			)
			const periodTo = this.items.some((period) => period.isExclude(dateTo))

			return !periodFrom || !periodTo
		}
		return false
	}

	isExcludeCell(cell: Cell) {
		//Сложная версия для проверки. Подходят для больших и маленьких слотов (Для маленьких лучше использовать isExcludeLite)
		if (this.isExcludeLite(cell)) return true

		return this.findExcludeInRange(cell)
	}

	isExclude(cellOrDate: Cell | Date) {
		//Автоматическая версия для проверки
		if (cellOrDate instanceof Date) {
			return this.isExcludeLite(cellOrDate)
		}

		return this.isExcludeCell(cellOrDate)
	}
}

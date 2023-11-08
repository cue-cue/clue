import dayjs from "dayjs"
import { Cell, CellList } from "."

const startDate = dayjs().startOf('day').toDate()

describe('CellList.genCell', () => {
    let cellList:CellList
    beforeAll(() => {
        cellList = new CellList({
            date: startDate
        })
    })
    test('normal', () => {
        const minutes = [0,10,20,30,40,50,60]
        minutes.forEach(m => {
            expect(cellList.genCell(m)).toEqual({
                from: dayjs(startDate).add(m,'minute').toDate(),
                to: dayjs(startDate).add(cellList.step + m,'minutes').toDate()
            })
        })
    })
    test('Ноль и меньше нуля', () => {
        const minutes = [0,10,20,30,40,50,60].map(m => m * -1)
        minutes.forEach(m => {
            expect(cellList.genCell(m)).toEqual({
                from: dayjs(startDate).add(m,'minute').toDate(),
                to: dayjs(startDate).add(cellList.step + m,'minutes').toDate()
            })
        })
    })
    test('Не очень ровные', () => {
        const minutes = [5,12,28,32,44,51,64].map(m => m)
        minutes.forEach(m => {
            expect(cellList.genCell(m)).toEqual({
                from: dayjs(startDate).add(m,'minute').toDate(),
                to: dayjs(startDate).add(cellList.step + m,'minutes').toDate()
            })
        })
    })
    test('Очень большие', () => {
        const minutes = [524,11232,2428,321,454,251,264].map(m => m)
        minutes.forEach(m => {
            expect(cellList.genCell(m)).toEqual({
                from: dayjs(startDate).add(m,'minute').toDate(),
                to: dayjs(startDate).add(cellList.step + m,'minutes').toDate()
            })
        })
    })
    test('Дробные', () => {
        const minutes = [52.4,11.232,24.28,32.1,4.54,25.1,26.4].map(m => m)
        minutes.forEach(m => {
            expect(cellList.genCell(m)).toEqual({
                from: dayjs(startDate).add(m,'minute').toDate(),
                to: dayjs(startDate).add(cellList.step + m,'minutes').toDate()
            })
        })
    })
})

describe('CellList.genCells', () => {
    let cellList:CellList
    beforeAll(() => {
        cellList = new CellList({
            end: 60,
            date: startDate
        })
    })

    test('Обычный такой, базовый лист', () => {
        const testData = [1,2,3,4].map(n => new Cell({
            from: dayjs(startDate).add(cellList.step * (n - 1), 'minute').toDate(),
            to: dayjs(startDate).add(cellList.step * n, 'minute').toDate()
        }))
        expect(cellList.genCells()).toEqual(testData)
    })
})
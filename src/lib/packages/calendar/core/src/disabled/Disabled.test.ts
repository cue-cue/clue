import dayjs from "dayjs"
import { Disabled, type IDisabledParams } from "./Disabled"

describe('Disabled.parseInclude', () => {
    test('[]', () => {
        const disabled = new Disabled({include: '[]'})
        expect(disabled.parseInclude()).toEqual({
            from: '[',
            to: ']'
        })
    })
    test('()', () => {
        const disabled = new Disabled({include: '()'})
        expect(disabled.parseInclude()).toEqual({
            from: '(',
            to: ')'
        })
    })
    test('(]', () => {
        const disabled = new Disabled({include: '(]'})
        expect(disabled.parseInclude()).toEqual({
            from: '(',
            to: ']'
        })
    })
    test('[)', () => {
        const disabled = new Disabled({include: '[)'})
        expect(disabled.parseInclude()).toEqual({
            from: '[',
            to: ')'
        })
    })
    test('empty', () => {
        const disabled = new Disabled()
        expect(disabled.parseInclude()).toEqual({
            from: '[',
            to: ']'
        })
    })
})

describe('Disabled.getType', () => {
    type Types = ReturnType<Disabled['getType']>

    test('from', () => {
        const disabled = new Disabled({from: new Date()})
        expect(disabled.getType()).toEqual<Types>('from')
    })
    test('to', () => {
        const disabled = new Disabled({to: new Date()})
        expect(disabled.getType()).toEqual<Types>('to')
    })
    test('between', () => {
        const disabled = new Disabled({from: new Date(), to: new Date()})
        expect(disabled.getType()).toEqual<Types>('between')
    })
    test('empty', () => {
        const disabled = new Disabled()
        expect(disabled.getType()).toEqual<Types>('empty')
    })
})

describe('Disabled.check', () => {
    test('Одинаковые даты []', () => {
        const disabled = new Disabled()
        const date = new Date()
        expect(disabled.check(date,date, '>')).toBeTruthy()
        expect(disabled.check(date,date, '<')).toBeTruthy()
        expect(disabled.check(date,date, '<', false)).toBeFalsy()
        expect(disabled.check(date,date, '>', false)).toBeFalsy()
    })
    test('Одинаковые даты ()', () => {
        const disabled = new Disabled({include: '()'})
        const date = new Date()
        expect(disabled.check(date,date, '>')).toBeFalsy()
        expect(disabled.check(date,date, '<')).toBeFalsy()
        expect(disabled.check(date,date, '<', false)).toBeFalsy()
        expect(disabled.check(date,date, '>', false)).toBeFalsy()
    })
    test('Разные даты a > b', () => {
        const disabled = new Disabled()
        const date = {
            a: dayjs().add(1,'hour').toDate(),
            b: dayjs().toDate()
        }
        expect(disabled.check(date.a,date.b, '>')).toBeTruthy()
        expect(disabled.check(date.a,date.b, '<')).toBeFalsy()
        expect(disabled.check(date.a,date.b, '>', false)).toBeTruthy()
        expect(disabled.check(date.a,date.b, '<', false)).toBeFalsy()
    })
    test('Разные даты a < b', () => {
        const disabled = new Disabled()
        const date = {
            a: dayjs().toDate(),
            b: dayjs().add(1,'hour').toDate()
        }
        expect(disabled.check(date.a,date.b, '>')).toBeFalsy()
        expect(disabled.check(date.a,date.b, '<')).toBeTruthy()
        expect(disabled.check(date.a,date.b, '>', false)).toBeFalsy()
        expect(disabled.check(date.a,date.b, '<', false)).toBeTruthy()
    })
    describe.each<{
        include: Disabled['include'],
        tests: {
            dates: [Date, Date],
            operator: Parameters<Disabled['check']>[2]
            expected: boolean
        }[]
    }>([
        {
            include: '[]',
            tests: [
                {
                    dates: [dayjs().startOf('day').toDate(), dayjs().startOf('day').toDate()],
                    operator: '<',
                    expected: true
                },
                {
                    dates: [dayjs().startOf('day').toDate(), dayjs().startOf('day').toDate()],
                    operator: '>',
                    expected: true
                }
            ]
        },
        {
            include: '()',
            tests: [
                {
                    dates: [dayjs().startOf('day').toDate(), dayjs().startOf('day').toDate()],
                    operator: '<',
                    expected: false
                },
                {
                    dates: [dayjs().startOf('day').toDate(), dayjs().startOf('day').toDate()],
                    operator: '>',
                    expected: false
                },
                {
                    dates: [dayjs().add(1, 'hour').toDate(), dayjs().toDate()],
                    operator: '>',
                    expected: true
                },
                {
                    dates: [dayjs().toDate(), dayjs().add(1, 'hour').toDate()],
                    operator: '<',
                    expected: true
                }
            ]
        }
    ])('include $include', ({include, tests}) => {
        const disabled = new Disabled({include})
        test.each(tests)('$dates.0 $operator $dates.1', ({dates, expected, operator}) => {
            expect(disabled.check(...dates, operator)).toBe(expected)
        })
    })
})

describe('Disabled.availability', () => {
    test.each<{
        data: IDisabledParams['availability'],
        expected: Required<Disabled['availability']>
    }>([
        {
            data: {
                total: 200,
                occupied: 100,
                free: 100,
            },
            expected: {
                total: 200,
                occupied: 100,
                free: 100,
            }
        },
        {
            data: {
                total: 200,
                occupied: 300,
                free: 40,
            },
            expected: {
                total: 200,
                occupied: 200,
                free: 0,
            }
        },
        {
            data: {
                total: 100,
                occupied: 50,
                free: 60,
            },
            expected: {
                total: 100,
                occupied: 50,
                free: 50,
            }
        }
    ])('Все значения: $data.total/$data.occupied', ({data, expected}) => {
        expect(new Disabled({
            availability: data
        }).availability).toEqual(expected)
    })

    test.each<{
        data: IDisabledParams['availability'],
        expected: Required<Disabled['availability']>
    }>([
        {
            data: {
                total: 200,
                occupied: 100,
            },
            expected: {
                total: 200,
                occupied: 100,
                free: 100,
            }
        },
        {
            data: {
                total: 200,
                occupied: 300,
            },
            expected: {
                total: 200,
                occupied: 200,
                free: 0,
            }
        },
        {
            data: {
                total: 100,
                occupied: 50,
            },
            expected: {
                total: 100,
                occupied: 50,
                free: 50,
            }
        },
        {
            data: {
                total: -20,
                occupied: 30,
            },
            expected: {
                total: 0,
                occupied: 0,
                free: 0,
            }
        },
        {
            data: {
                total: 70,
                occupied: 10,
            },
            expected: {
                total: 70,
                occupied: 10,
                free: 60,
            }
        }
    ])('Без free: $data.total/$data.occupied', ({data, expected}) => {
        expect(new Disabled({
            availability: data
        }).availability).toEqual(expected)
    }) 
    test.each<{
        data: IDisabledParams['availability'],
        expected: Required<Disabled['availability']>
    }>([
        {
            data: {
                total: 200,
                free: 400
            },
            expected: {
                total: 200,
                occupied: 0,
                free: 200,
            }
        },
        {
            data: {
                total: 200,
                free: 100,
            },
            expected: {
                total: 200,
                occupied: 100,
                free: 100,
            }
        },
        {
            data: {
                total: 100,
                free: 300,
            },
            expected: {
                total: 100,
                occupied: 0,
                free: 100,
            }
        },
        {
            data: {
                total: -20,
                free: -20,
            },
            expected: {
                total: 0,
                occupied: 0,
                free: 0,
            }
        },
        {
            data: {
                total: 70,
                free: 10,
            },
            expected: {
                total: 70,
                occupied: 60,
                free: 10,
            }
        }
    ])('Без occupied: $data.total/$data.occupied', ({data, expected}) => {
        expect(new Disabled({
            availability: data
        }).availability).toEqual(expected)
    }) 
})
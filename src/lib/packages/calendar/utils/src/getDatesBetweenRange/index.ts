import dayjs from 'dayjs'

export const getDatesBetweenRange = (a:Date, b:Date) => {
    a && (a = dayjs(a).startOf('day').toDate())
    b && (b = dayjs(b).endOf('day').toDate())
    const dateArray = []
    if (a && b) {
        let currentDate = a
        while (currentDate <= b) {
            dateArray.push(new Date (currentDate));
            currentDate = dayjs(currentDate).add(1, 'day').toDate();
        }
    }
    return dateArray
}
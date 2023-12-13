import dayjs from "dayjs";
import isTodayPlugin from 'dayjs/plugin/isToday.js'

dayjs.extend(isTodayPlugin)

export const isToday = (date:Date, options?:{
    anyWeek?:boolean
}) => {
    const dayjsInstance = dayjs(date)

    if (options?.anyWeek) {
        if (dayjsInstance.isSame(new Date(), 'month')) {
            return dayjsInstance.day() === dayjs().day()
        }
    }
    
    return dayjsInstance.isToday()
}
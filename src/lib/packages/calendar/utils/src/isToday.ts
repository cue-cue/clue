import dayjs from "dayjs";
import isTodayPlugin from 'dayjs/plugin/isToday.js'

dayjs.extend(isTodayPlugin)

export const isToday = (date:Date) => dayjs(date).isToday()
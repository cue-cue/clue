import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

export class Timezone {
	date
	timezone
	constructor(date: Date | string, timezone: string) {
        this.date = date
		this.timezone = timezone
	}
	dayjsTimezoneInit() {
        if (!dayjs?.utc) {
            dayjs?.extend(utc)
        }
        if (!dayjs?.tz) {
            dayjs?.extend(timezone)
        }
    }
	apply(change = false) {
        this.dayjsTimezoneInit()
		if (change) {
			return dayjs(this.date).tz(this.timezone, true).toDate()
		} else {
			const dateUTCOffset = dayjs(this.date).utcOffset()
			const timezoneOffset = dayjs(this.date).tz(this.timezone).utcOffset()
			return new Date(+new Date(this.date) + (timezoneOffset - dateUTCOffset) * 60000)
		}
	}
}

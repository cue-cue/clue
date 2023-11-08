import dayjs from "dayjs";

export interface IPeriodParams {
    dates:Date[]
    start:number
    end:number
}

export class Period {
    dates
    start
    end
    constructor({
        dates,
        start,
        end
    }:IPeriodParams) {
        this.dates = dates
        this.start = start
        this.end = end
    }
    private dateToDayString(date:Date) {
        return dayjs(date).locale('en').format('dd').toLowerCase()
    }
    check(date:Date) {
        if (!date) return false
        date = new Date(date)
        const dateDay = this.dateToDayString(date)
        const dateMinutes = date.getHours() * 60 + date.getMinutes()
        const isDay = this.dates.map(date => this.dateToDayString(date)).includes(dateDay)
        const isTime = dateMinutes >= +this.start && dateMinutes <= +this.end
        return isDay && isTime
    }
    checkMany(dates:Date[]) {
        return dates.every(date => this.check(date))
    }
}
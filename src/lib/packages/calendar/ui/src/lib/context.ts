import { Context } from "@cluue/utils";
import type { createCalendarStore } from "./store.js";

interface ICalendarContextData {
    store:ReturnType<typeof createCalendarStore>
}

export class CalendarContext extends Context<ICalendarContextData> {
    constructor() {
        super('calendar')
    }
}
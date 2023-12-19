import { Context } from '@cluue/utils'
import type { createCalendarStore } from './index.js'

export interface ICalendarContextData {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	store: ReturnType<typeof createCalendarStore>
}

export class CalendarContext extends Context<ICalendarContextData> {
	constructor() {
		super('calendar')
	}
}

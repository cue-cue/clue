import { Context } from '@cluue/utils'
import type { createCalendarStore } from './store.js'

export interface ICalendarContextData {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	store: ReturnType<typeof createCalendarStore<any>>
}

export class CalendarContext extends Context<ICalendarContextData> {
	constructor() {
		super('calendar')
	}
}

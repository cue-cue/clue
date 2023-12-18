<script lang="ts">
	import dayjs from 'dayjs'
	import { generateClassNames } from '@cluue/utils'
	import DaysNames from './DaysNames.svelte'
	import DaysList from './DaysList.svelte'
	import { CalendarContext } from '../../lib/context.js'
	import { derived } from 'svelte/store'
	import Cell from '../Cell.svelte'
	import { isToday } from '@cluue/calendar-utils'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }

	const { store } = new CalendarContext().get()

	const isActiveDate = derived(store, ($store) => {
		return (date: Date) => {
			if (!date || !$store.navigatorDate) return false
			return +dayjs(date).startOf('day') === +dayjs($store.navigatorDate).startOf('day')
		}
	})

	const handler = {
		dayClick(date: Date) {
			store.navigator.setDate(date)
		}
	}
</script>

<div class={generateClassNames(['DaysNavigator', className])}>
	<DaysNames />
	<DaysList rows={1} date={$store.navigatorDate} normalize={false} let:date let:isExclude>
		<Cell {date} active={$isActiveDate(date)} ghost={isExclude} type={isToday(date) ? 'negative' : undefined} on:click={() => handler.dayClick(date)} />
	</DaysList>
</div>

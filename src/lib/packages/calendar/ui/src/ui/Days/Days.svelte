<script lang="ts">
	import dayjs from 'dayjs'
	import { generateClassNames } from '@cluue/utils'
	import DaysList from './DaysList.svelte'
	import type { ComponentProps } from 'svelte'
	import Cell from '../Cell.svelte'
	import { CalendarContext } from '../../lib/context.js'
	import { derived } from 'svelte/store'
	import { isToday } from '@cluue/calendar-utils'

	interface $$Props extends Omit<ComponentProps<DaysList>, 'date'> {
		class?: string
	}

	let className = ''
	export { className as class }

	const { store } = new CalendarContext().get()

	const handler = {
		dayClick(date:Date) {
			store.select(date)
		}
	}

	const isActiveDay = derived(store, $store => {
		return (date:Date) => {
			if (!date || !$store.date) return false
			return +dayjs(date).startOf('day') === +dayjs($store.date).startOf('day')
		}
	})

</script>

<DaysList class={generateClassNames(['CalendarDays', className])} date={$store.navigatorDate} let:date let:isExclude>
	<Cell
		{date}
		active={$isActiveDay(date)}
		type={isToday(date) ? 'negative' : undefined}
		ghost={isExclude}
		on:click={() => handler.dayClick(date)}
	/>
</DaysList>

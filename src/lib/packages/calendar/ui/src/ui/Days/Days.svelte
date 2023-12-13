<script lang="ts">
	import dayjs from 'dayjs'
	import { generateClassNames } from '@cluue/utils'
	import DaysList from './DaysList.svelte'
	import type { ComponentProps } from 'svelte'
	import Cell from '../Cell.svelte'
	import type {Cell as CellType} from '@cluue/calendar-core'
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
		dayClick(cell:CellType) {
			store.select(cell)
		}
	}

	const isActiveDay = derived(store, $store => {
		return (cell:CellType) => {
			if (!cell || !$store.date) return false

			return store.selector.check(cell)
		}
	})

</script>
<DaysList class={generateClassNames(['CalendarDays', className])} date={$store.navigatorDate} let:date let:cell let:isExclude>
	<Cell
		{date}
		active={$isActiveDay(cell)}
		type={isToday(date) ? 'negative' : undefined}
		ghost={isExclude}
		on:click={() => handler.dayClick(cell)}
	/>
</DaysList>

<script lang="ts">
	import dayjs from 'dayjs'
	import { generateClassNames } from '@cluue/utils'
	import DaysList from './DaysList.svelte'
	import type { ComponentProps } from 'svelte'
	import Cell from '../Cell.svelte'
	import {Disabled, type Cell as CellType} from '@cluue/calendar-core'
	import { CalendarContext } from '../../lib/context.js'
	import { derived } from 'svelte/store'
	import { isToday } from '@cluue/calendar-utils'

	interface $$Props extends Omit<ComponentProps<DaysList>, 'date'> {
		class?: string
	}

	let className = ''
	export { className as class }

	const { store: {options, ...store} } = new CalendarContext().get()

	const handler = {
		dayClick(event:MouseEvent, cell:CellType) {
			store.select(cell, {
				mode: event.shiftKey ? 'range' : 'single'
			})
		}
	}

	const isActiveDay = derived([store, options], ([$store, $options]) => {
		return (cell:CellType) => {
			if (!cell || !$store.date) return false
			if ($options.range) {
				return new Disabled(store.selector.selected).isDisabled(cell)
			} else if ($store.date instanceof Date) {
				return +dayjs(cell.from).startOf('day') === +dayjs($store.date).startOf('day')
			}
			return false
		}
	})

</script>
<DaysList class={generateClassNames(['CalendarDays', className])} date={$store.navigatorDate} let:date let:cell let:isExclude>
	<Cell
		{date}
		active={$isActiveDay(cell)}
		type={isToday(date) ? 'negative' : undefined}
		ghost={isExclude}
		on:click={e => handler.dayClick(e,cell)}
	/>
</DaysList>

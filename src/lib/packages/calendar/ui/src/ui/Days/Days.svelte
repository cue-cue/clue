<script lang="ts">
	import dayjs from 'dayjs'
	import { generateClassNames } from '@cluue/utils'
	import DaysList from './DaysList.svelte'
	import type { ComponentProps } from 'svelte'
	import Cell from '../Cell.svelte'
	import { Disabled, Cell as CellType } from '@cluue/calendar-core'
	import { CalendarContext } from '../../lib/context.js'
	import { derived } from 'svelte/store'
	import { isToday } from '@cluue/calendar-utils'
	import Tooltip from '$lib/packages/base/src/Tooltip/Tooltip.svelte'

	interface $$Props extends Omit<ComponentProps<DaysList>, 'date'> {
		class?: string
	}

	let className = ''
	export { className as class }

	const {
		store: { options, navigator, selector, ...store }
	} = new CalendarContext().get()

	$store.date

	const handler = {
		dayClick(event: MouseEvent, cell: CellType) {
			store.select(cell, {
				mode: event.shiftKey ? 'range' : 'single'
			})
		}
	}

	const isActiveDay = derived([store, options], ([$store, $options]) => {
		return (cell: CellType) => {
			if (!cell || !$store.date) return false
			if ($options.range) {
				return new Disabled(selector.selected).isDisabled(cell)
			} else if ($store.date instanceof Date) {
				return +dayjs(cell.from).startOf('day') === +dayjs($store.date).startOf('day')
			}
			return false
		}
	})

	const getDayPositionBySelected = derived([store], ([$store]) => {
		return (cell: CellType) => {
			if (!$store.date || $store.date instanceof Date || !selector.check(cell)) return
			return selector.validate(cell)
		}
	})
</script>

<DaysList class={generateClassNames(['CalendarDays', className])} date={$navigator.date} let:date let:cell let:isExclude>
	{@const position = $getDayPositionBySelected(cell)}
	<Tooltip>
		<Cell {date} active={$isActiveDay(cell)} type={isToday(date) ? 'negative' : undefined} ghost={isExclude} on:click={(e) => handler.dayClick(e, cell)} />
		<svelte:fragment slot="content"><pre><code>{JSON.stringify(position, null, 2)}</code></pre></svelte:fragment>
	</Tooltip>
</DaysList>

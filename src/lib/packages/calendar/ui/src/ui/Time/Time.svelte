<script lang="ts">
	import { generateClassNames } from '@cluue/utils'
	import { CellList } from '@cluue/calendar-core'
	import GridRow from '../Grid/GridRow.svelte'
	import Cell from '../Cell.svelte'
	import type { Cell as CellType } from '@cluue/calendar-core'
	import { CalendarContext } from '../../lib/context.js'
	import { derived } from 'svelte/store'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }

	const {
		store: { navigator, options, isDisabled, ...store }
	} = new CalendarContext().get()

	$: cellList = new CellList({
		date: $navigator.date
	})

	const handler = {
		cellClick(event: MouseEvent, cell: CellType) {
			store.select(cell, {
				mode: event.shiftKey ? 'range' : 'single',
				manualRange: true,
				overload: !$options.range
			})
		}
	}

	const isActive = derived(store, () => {
		return (cell: CellType) => {
			return store.selector.check(cell)
		}
	})
</script>

<GridRow class={generateClassNames(['CalendarTime', className])} gap="medium" columns={`repeat(auto-fit, minmax(55px, 1fr))`}>
	{#each cellList.cells as cell (+cell.from)}
		<Cell date={cell.from} disabled={$isDisabled(cell).disabled} variant="time" active={$isActive(cell)} on:click={(e) => handler.cellClick(e, cell)} />
	{/each}
</GridRow>

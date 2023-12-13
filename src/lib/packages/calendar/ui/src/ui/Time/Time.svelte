<script lang="ts">
	import { generateClassNames } from '@cluue/utils'
	import { CellList } from '@cluue/calendar-core'
	import GridRow from '../Grid/GridRow.svelte'
	import Cell from '../Cell.svelte'
	import type {Cell as CellType} from '@cluue/calendar-core'
	import { CalendarContext } from '../../lib/context.js'
	import { derived } from 'svelte/store'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }

	const { store } = new CalendarContext().get()

	const cellList = new CellList({
		date: new Date()
	})

	const handler = {
		cellClick(cell:CellType) {
			store.select(cell)
		}
	}

	const isActive = derived(store, () => {
		return (cell:CellType) => {
			return store.selector.check(cell)
		}
	})
</script>

<GridRow class={generateClassNames(['CalendarTime', className])} columns={`repeat(auto-fit, minmax(55px, 1fr))`}>
	{#each cellList.cells as cell (+cell.from)}
		<Cell
			date={cell.from}
			variant="time"
			active={$isActive(cell)}
			on:click={() => handler.cellClick(cell)}
		/>
	{/each}
</GridRow>
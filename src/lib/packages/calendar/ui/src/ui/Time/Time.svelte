<script lang="ts">
	import { generateClassNames } from '@cluue/utils'
	import { CellList } from '@cluue/calendar-core'
	import GridRow from '../Grid/GridRow.svelte'
	import Cell from '../Cell.svelte'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }

	const cellList = new CellList({
		date: new Date()
	})
</script>

<GridRow class={generateClassNames(['CalendarTime', className])} columns={`repeat(auto-fit, minmax(55px, 1fr))`}>
	{#each cellList.cells as cell (+cell.from)}
		<Cell date={cell.from} variant="time" />
	{/each}
</GridRow>
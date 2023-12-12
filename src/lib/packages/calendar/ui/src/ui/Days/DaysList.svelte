<script lang="ts">
	import { generateClassNames } from '@cluue/utils'
	import { CellList } from '@cluue/calendar-core'
	import GridRow from '../Grid/GridRow.svelte'

	interface $$Props {
		class?: string
		cols?: number
		rows?: number
	}

	let className = ''
	export { className as class }
	export let cols: Exclude<$$Props['cols'], undefined> = 7
	export let rows: Exclude<$$Props['rows'], undefined> = 4

	const cellList = new CellList({
		date: new Date(),
		step: 1,
		end: cols * rows,
		unitType: 'day'
	})
</script>

<GridRow class={generateClassNames(['CalendarDaysList', className])} columns={`repeat(${cols}, 1fr)`}>
	{#each cellList.cells as cell (+cell.from)}
		<slot {cell} {rows} {cols} date={cell.from}/>
	{/each}
</GridRow>

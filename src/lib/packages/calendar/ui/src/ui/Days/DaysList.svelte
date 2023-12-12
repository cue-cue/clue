<script lang="ts">
	import dayjs from 'dayjs'
	import { generateClassNames } from '@cluue/utils'
	import { CellList } from '@cluue/calendar-core'
	import GridRow from '../Grid/GridRow.svelte'

	interface $$Props {
		class?: string
		date: Date
		cols?: number
		rows?: number
	}

	let className = ''
	export { className as class }
	export let date:$$Props['date']
	export let cols: Exclude<$$Props['cols'], undefined> = 7
	export let rows: Exclude<$$Props['rows'], undefined> = 5

	const getStartDate = (baseDate:Date) => {
		return dayjs(baseDate).startOf('month').startOf('week').add(1, 'day').toDate()
	}

	const isExclude = (cellDate:Date) => {
		return +dayjs(cellDate).startOf('month') !== +dayjs(date).startOf('month')
	}

	$: cellList = new CellList({
		date: getStartDate(date),
		step: 1,
		end: cols * rows,
		unitType: 'day'
	})
</script>

<GridRow class={generateClassNames(['CalendarDaysList', className])} columns={`repeat(${cols}, 1fr)`}>
	{#each cellList.cells as cell (+cell.from)}
		<slot {cell} {rows} {cols} date={cell.from} isExclude={isExclude(cell.from)}/>
	{/each}
</GridRow>

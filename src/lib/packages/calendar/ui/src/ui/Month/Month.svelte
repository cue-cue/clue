<script lang="ts">
	import { generateClassNames } from '@cluue/utils'
	import { CalendarContext } from '../../lib/context.js'
	import GridRow from '../Grid/GridRow.svelte'
	import Cell from '../Cell.svelte'
	import dayjs from 'dayjs'
	import { CellList } from '@cluue/calendar-core'
	import { derived } from 'svelte/store'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }

	const {
		store: { navigator, options }
	} = new CalendarContext().get()

	const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

	const handler = {
		click(month: number) {
			navigator.set('month', month)
			navigator.goto('date')
		}
	}

	const isActive = derived(navigator, ($navigator) => {
		return (month: number) => {
			return $navigator.date.getMonth() === month
		}
	})
</script>

<GridRow class={generateClassNames(['CalendarMonth', className])} gap="medium" columns="repeat(3, 1fr)">
	{#each months as month (month)}
		<Cell variant="unit" on:click={() => handler.click(month)} active={$isActive(month)}>
			{dayjs().month(month).format($options.formats?.month)}
		</Cell>
	{/each}
</GridRow>

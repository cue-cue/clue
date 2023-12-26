<script lang="ts">
	import { generateClassNames } from '@cluue/utils'
	import dayjs from 'dayjs'
	import { CalendarContext } from '../../lib/context.js'
	import GridRow from '../Grid/GridRow.svelte'
	import Cell from '../Cell.svelte'
	import { derived } from 'svelte/store'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }

	const {
		store: { options, navigator },
	} = new CalendarContext().get()

	const handler = {
		click(year: number) {
			navigator.set('year', year)
			navigator.goto('date')
		},
	}

	const isActive = derived(navigator, ($navigator) => {
		return (year: number) => {
			return $navigator.date.getFullYear() === year
		}
	})

	const isDisabled = derived([navigator, options], ([$navigator, $options]) => {
		return (year: number) =>
			$options.isDateExclude(dayjs($navigator.date).year(year).toDate()).result
	})

	$: years = new Array($navigator.year.step)
		.fill(undefined)
		.map((_, index) => index + $navigator.year.current)
</script>

<GridRow
	class={generateClassNames(['CalendarYear', className])}
	gap="medium"
	columns="repeat(3, 1fr)"
>
	{#each years as year (year)}
		<Cell
			variant="unit"
			on:click={() => handler.click(year)}
			active={$isActive(year)}
			disabled={$isDisabled(year)}
		>
			{dayjs().year(year).format($options.formats?.year)}
		</Cell>
	{/each}
</GridRow>

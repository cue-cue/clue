<script lang="ts">
	import dayjs from 'dayjs'
	import { generateClassNames } from '@cluue/utils'
	import DaysNames from './DaysNames.svelte'
	import DaysList from './DaysList.svelte'
	import type { ComponentProps } from 'svelte'
	import Cell from '../Cell.svelte'
	import { CalendarContext } from '../../lib/context.js'
	import { derived } from 'svelte/store'

	interface $$Props extends ComponentProps<DaysList> {
		class?: string
		names?: boolean
	}

	let className = ''
	export { className as class }
	export let names: $$Props['names'] = true

	const { store } = new CalendarContext().get()

	const handler = {
		dayClick(date:Date) {
			store.select(date)
		}
	}

	const isActiveDay = derived(store, $store => {
		return (date:Date) => {
			if (!date || !$store.date) return false
			return +dayjs(date).startOf('day') === +dayjs($store.date).startOf('day')
		}
	})

</script>

<div class={generateClassNames(['CalendarDays', className])}>
	{#if names}
		<DaysNames />
	{/if}
	<DaysList cols={7} rows={4} let:date>
		<Cell
			{date}
			active={$isActiveDay(date)}
			on:click={() => handler.dayClick(date)}
		/>
	</DaysList>
</div>

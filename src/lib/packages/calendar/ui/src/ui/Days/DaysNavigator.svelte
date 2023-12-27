<script lang="ts">
	import { config } from '@cluue/config'
	import dayjs from 'dayjs'
	import { generateClassNames } from '@cluue/utils'
	import DaysNames from './DaysNames.svelte'
	import DaysList from './DaysList.svelte'
	import { CalendarContext } from '../../lib/context.js'
	import { derived } from 'svelte/store'
	import Cell from '../Cell.svelte'
	import { isToday } from '@cluue/calendar-utils'
	import { slide } from 'svelte/transition'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }

	const {
		store: { navigator, options },
	} = new CalendarContext().get()

	const isActiveDate = derived(navigator, ($navigator) => {
		return (date: Date) => {
			if (!date || !$navigator.date) return false
			return +dayjs(date).startOf('day') === +dayjs($navigator.date).startOf('day')
		}
	})

	const handler = {
		dayClick(date: Date) {
			navigator.set(date)
		},
	}
</script>

<div class={generateClassNames(['DaysNavigator', className])}>
	<DaysNames />
	{#if $options.time}
		<div transition:slide={$config.transition}>
			<DaysList rows={1} date={$navigator.viewDate} normalize={false} let:date let:isExclude>
				<Cell
					{date}
					active={$isActiveDate(date)}
					ghost={isExclude}
					type={isToday(date) ? 'negative' : undefined}
					on:click={() => handler.dayClick(date)}
				/>
			</DaysList>
		</div>
	{/if}
</div>

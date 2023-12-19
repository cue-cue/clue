<script lang="ts">
	import dayjs from 'dayjs'
	import { generateClassNames } from '@cluue/utils'
	import GridRow from '../Grid/GridRow.svelte'
	import { isToday } from '@cluue/calendar-utils'
	import { CalendarContext } from '../../lib/context.js'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }

	const {
		store: { options, navigator }
	} = new CalendarContext().get()

	$: dateList = [1, 2, 3, 4, 5, 6, 7].map((day) => {
		let date = dayjs($navigator.date)
		if (!$options.time) {
			date = date.date(14)
		}
		return {
			date: date.day(day),
			day
		}
	})
</script>

<GridRow tag="ul" class={generateClassNames(['CalendarDaysNames', className])} columns={`repeat(${dateList.length}, 40px)`}>
	{#each dateList as { date, day } (day)}
		<li
			data-today={isToday(date.toDate(), {
				anyWeek: !$options.time
			})}
		>
			{date.format('dd')}
		</li>
	{/each}
</GridRow>

<style lang="sass">
	:global(.ClueCalendarDaysNames)
		list-style: none
		padding: 0
		margin: 0
		height: 40px
		align-items: center
		li
			margin: 0
			text-align: center
			text-transform: capitalize
			font-weight: 500
			font-size: 14px
			transition: .3s ease-in-out
			transition-property: color
			&[data-today='true']
				color: var(--clue-color-negative-600)
</style>

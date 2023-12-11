<script lang="ts">
	import dayjs from 'dayjs'
	import { generateClassNames } from '@cluue/utils'
	import GridRow from '../Grid/GridRow.svelte'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }

	$: dates = [1, 2, 3, 4, 5, 6, 7].map((el) => dayjs().set('day', el))
</script>

<GridRow tag="ul" class={generateClassNames(['CalendarDaysNames', className])} columns={`repeat(${dates.length}, 1fr)`}>
	{#each dates as date (+date)}
		<li>
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
</style>

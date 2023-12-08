<script lang="ts">
	import dayjs from 'dayjs'
	import Button from '$lib/packages/base/src/Button/Button.svelte'
	import Tooltip from '$lib/packages/base/src/Tooltip/Tooltip.svelte'
	import { Cell, Picker } from '@cluue/calendar'
	import { CellList } from '@cluue/calendar-core'
	import type { ComponentProps } from 'svelte'

	const days = new CellList({
		date: new Date(),
		start: 0,
		step: 1,
		end: 7 * 6, //cols * rows
		unitType: 'day'
	})

	const cellTypes: Array<Omit<ComponentProps<Cell>, 'date'> & { id: string }> = [
		{
			id: 'base'
		},
		{
			id: 'base:disabled',
			disabled: true
		},
		{
			id: 'base:active',
			active: true
		},
		{
			id: 'negative',
			type: 'negative'
		},
		{
			id: 'negative:disabled',
			type: 'negative',
			disabled: true
		},
		{
			id: 'negative:active',
			type: 'negative',
			active: true
		}
	]

	const time = new CellList({
		date: new Date(),
		end: 15 * 4 * 7
	})
</script>

<Tooltip>
	<Button size="small">days</Button>
	<svelte:fragment slot="content">
		<pre><code>{JSON.stringify(days, null, 2)}</code></pre>
	</svelte:fragment>
</Tooltip>
<Tooltip>
	<Button size="small">time</Button>
	<svelte:fragment slot="content">
		<pre><code>{JSON.stringify(time, null, 2)}</code></pre>
	</svelte:fragment>
</Tooltip>

<h2>Picker</h2>
<Picker />

<h2>Days</h2>
<ul>
	{#each cellTypes as { id, ...props } (id)}
		<li>
			<h3>{id}</h3>
			<div class="days-grid">
				{#each days.cells as day (+day.from)}
					<Cell date={day.from} {...props}>{dayjs(day.from).format('DD')}</Cell>
				{/each}
			</div>
		</li>
	{/each}
</ul>

<h2>Time</h2>
<ul>
	{#each cellTypes as { id, ...props } (id)}
		<li>
			<h3>{id}</h3>
			<div class="days-grid">
				{#each time.cells as day (+day.from)}
					<Tooltip>
						<Cell date={day.from} {...props} variant="time">{dayjs(day.from).format('HH:mm')}</Cell>
						<svelte:fragment slot="content">
							<span>{dayjs(day.from).format('HH:mm')} - {dayjs(day.to).format('HH:mm')}</span>
						</svelte:fragment>
					</Tooltip>
				{/each}
			</div>
		</li>
	{/each}
</ul>

<style lang="sass">
	ul
		display: flex
		flex-wrap: wrap
		width: 100%
		gap: 40px
	.days-grid
		display: grid
		width: fit-content
		grid-template-columns: repeat(7, 1fr)
		gap: 10px
</style>

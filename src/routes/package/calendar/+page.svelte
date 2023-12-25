<script lang="ts">
	import dayjs from 'dayjs'
	import Button from '$lib/packages/base/src/Button/Button.svelte'
	import Tooltip from '$lib/packages/base/src/Tooltip/Tooltip.svelte'
	import { Cell, Picker } from '@cluue/calendar'
	import { Block, CellList } from '@cluue/calendar-core'
	import type { ComponentProps } from 'svelte'
	import { BLOCKS } from './core/blocks.js'

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

	const blocks = [
		// new Block({
		// 	from: dayjs().startOf('day').add(20, 'hours').toDate(),
		// 	to: dayjs().startOf('day').add(24, 'hours').toDate()
		// }),
		new Block({
			drift: {
				before: 60,
				after: 60
			},
			from: dayjs().startOf('day').add(4, 'hours').toDate(),
			to: dayjs().startOf('day').add(6, 'hours').toDate()
		}),
		new Block({
			drift: {
				before: 60,
				after: 60
			},
			from: dayjs().startOf('day').add(7, 'hours').toDate(),
			to: dayjs().startOf('day').add(10, 'hours').toDate()
		}),
		// new Block({
		// 	from: dayjs().startOf('day').add(8, 'hours').toDate(),
		// 	to: dayjs().startOf('day').add(10, 'hours').toDate()
		// }),
		// new Block({
		// 	from: dayjs().startOf('day').add(1, 'day').add(4, 'hours').toDate(),
		// 	to: dayjs().startOf('day').add(1, 'day').add(9, 'hours').toDate()
		// }),
		new Block({
			from: dayjs().startOf('day').add(1, 'day').add(1, 'hours').toDate(),
			to: dayjs().startOf('day').add(1, 'day').add(66, 'hours').toDate()
		})
	]

	let pickerValue: ComponentProps<Picker>['value'] = new Date()
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
<Tooltip>
	<Button size="small">blocks</Button>
	<svelte:fragment slot="content">
		<pre><code>{JSON.stringify(blocks, null, 2)}</code></pre>
	</svelte:fragment>
</Tooltip>

<h2>Picker</h2>
<ul class="picker-list">
	<li>
		<Picker {blocks} bind:value={pickerValue} />
	</li>
	<li>
		<Picker {blocks} bind:value={pickerValue} />
	</li>
</ul>

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
	.picker-list
		display: flex
		align-items: flex-start
		gap: 20px
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

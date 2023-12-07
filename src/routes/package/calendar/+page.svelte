<script lang="ts">
	import dayjs from 'dayjs'
	import Button from '$lib/packages/base/src/Button/Button.svelte'
	import Tooltip from '$lib/packages/base/src/Tooltip/Tooltip.svelte'
	import {Cell} from '@cluue/calendar'
	import {CellList} from '@cluue/calendar-core'

	const days = new CellList({
		date: new Date(),
		start: 0,
		step: 1,
		end: 7 * 6,//cols * rows
		unitType: 'day'
	})

	const time = new CellList({
		date: new Date(),
	})
</script>
<Tooltip>
	<Button size='small'>days</Button>
	<svelte:fragment slot='content'>
		<pre><code>{JSON.stringify(days, null, 2)}</code></pre>
	</svelte:fragment>
</Tooltip>
<Tooltip>
	<Button size='small'>time</Button>
	<svelte:fragment slot='content'>
		<pre><code>{JSON.stringify(time, null, 2)}</code></pre>
	</svelte:fragment>
</Tooltip>

<h2>Days</h2>
<ul>
	<li>
		<h3>base</h3>
		<div class='days-grid'>
			{#each days.cells as day (+day.from)}
				<Cell>{dayjs(day.from).format('DD')}</Cell>
			{/each}
		</div>
	</li>
	<li>
		<h3>base:disabled</h3>
		<div class='days-grid'>
			{#each days.cells as day (+day.from)}
				<Cell disabled>{dayjs(day.from).format('DD')}</Cell>
			{/each}
		</div>
	</li>
	<li>
		<h3>base:active</h3>
		<div class='days-grid'>
			{#each days.cells as day (+day.from)}
				<Cell active>{dayjs(day.from).format('DD')}</Cell>
			{/each}
		</div>
	</li>
	<li>
		<h3>negative</h3>
		<div class='days-grid'>
			{#each days.cells as day (+day.from)}
				<Cell type='negative'>{dayjs(day.from).format('DD')}</Cell>
			{/each}
		</div>
	</li>
	<li>
		<h3>negative: active</h3>
		<div class='days-grid'>
			{#each days.cells as day (+day.from)}
				<Cell type='negative' active>{dayjs(day.from).format('DD')}</Cell>
			{/each}
		</div>
	</li>
</ul>


<style lang='sass'>
	ul
		display: flex
		flex-wrap: wrap
		gap: 40px
	.days-grid
		display: grid
		width: fit-content
		grid-template-columns: repeat(7, 1fr)
		gap: 10px
</style>
	

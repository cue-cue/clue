<script lang="ts">
	import Button from '$lib/packages/base/src/Button/Button.svelte'
	import Tooltip from '$lib/packages/base/src/Tooltip/Tooltip.svelte'
	import {CellList} from '@cluue/calendar-core'

	const days = new CellList({
		date: new Date(),
		start: 0,
		step: 1,
		end: 31,
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
	

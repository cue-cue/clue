<script lang="ts">
	import { CellList } from '$lib/packages/calendar/core/src/index.js'

	const days = new CellList({
		date: new Date(),
		start: 0,
		step: 1,
		end: 31,
		unitType: 'day'
	})
</script>

<pre><code>{JSON.stringify(days, null, 2)}</code></pre>

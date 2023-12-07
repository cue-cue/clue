<script lang="ts">
	import {CellList} from '@cluue/calendar-core'

	const days = new CellList({
		date: new Date(),
		start: 0,
		step: 1,
		end: 31,
		unitType: 'day'
	})
</script>

<pre><code>{JSON.stringify(days, null, 2)}</code></pre>

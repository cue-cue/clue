<script lang="ts">
	import { generateClassNames } from '@cluue/utils'
	import DaysNames from './DaysNames.svelte'
	import DaysList from './DaysList.svelte'
	import type { ComponentProps } from 'svelte'

	interface $$Props extends ComponentProps<DaysList> {
		class?: string
		names?: boolean
	}

	let className = ''
	export { className as class }
	export let names: $$Props['names'] = true
</script>

<div class={generateClassNames(['CalendarDays', className])}>
	{#if names}
		<DaysNames />
	{/if}
	<DaysList cols={7} rows={4} />
</div>

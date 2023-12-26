<script lang="ts">
	import dayjs from 'dayjs'
	import type { Cell } from '@cluue/calendar-core'
	import { generateClassNames } from '@cluue/utils'
	import CellBase from './CellBase.svelte'
	import type { ComponentProps } from 'svelte'

	interface $$Props extends ComponentProps<CellBase> {
		class?: string
		date?: Date | Cell
	}

	let className = ''
	export { className as class }
	export let date: $$Props['date'] = undefined
	export let variant: $$Props['variant'] = 'day'
</script>

<CellBase
	class={generateClassNames(['CalendarCell', className])}
	{variant}
	{...$$restProps}
	on:click
>
	<slot>
		{#if date instanceof Date}
			{#if variant === 'time'}
				{dayjs(date).format('HH:mm')}
			{:else}
				{dayjs(date).format('DD')}
			{/if}
		{/if}
	</slot>
</CellBase>

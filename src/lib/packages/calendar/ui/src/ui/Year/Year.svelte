<script lang="ts">
	import { generateClassNames } from '@cluue/utils'
	import dayjs from 'dayjs'
	import Select from '../Select/Select.svelte'
	import { CalendarContext } from '../../lib/context.js'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }

	const {
		store: { options, ...store }
	} = new CalendarContext().get()

	const handler = {
		click(e: MouseEvent, value: number) {
			store.navigator.set('year', value)
		}
	}

	$: start = $options.min?.getFullYear() ?? 1900
	$: end = $options.max?.getFullYear() ?? 2200

	$: years = new Array(end - start).fill(undefined).map((_, index) => index + start)
</script>

<Select class={generateClassNames(['CalendarYear', className])}>
	{dayjs($store.navigatorDate).format('YYYY')}
	<svelte:fragment slot="content">
		<ul>
			{#each years as year (year)}
				<li>
					<button on:click={(e) => handler.click(e, year)}>
						{dayjs(year).set('year', year).format('YYYY')}
					</button>
				</li>
			{/each}
		</ul>
	</svelte:fragment>
</Select>

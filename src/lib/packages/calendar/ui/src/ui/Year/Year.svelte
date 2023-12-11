<script lang="ts">
	import { generateClassNames } from '@cluue/utils'
	import dayjs from 'dayjs'
	import Select from '../Select/Select.svelte'

	interface $$Props {
		class?: string
		value?: Date
	}

	let className = ''
	export { className as class }
	export let value: $$Props['value'] = new Date()
</script>

<Select class={generateClassNames(['CalendarYear', className])}>
	{dayjs(value).format('YYYY')}
	<svelte:fragment slot="content">
		<ul>
			{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as el}
				<li>
					<button on:click={() => (value = dayjs(value).set(el, 'year').toDate())}>
						{dayjs(value).add(el, 'year').format('YYYY')}
					</button>
				</li>
			{/each}
		</ul>
	</svelte:fragment>
</Select>

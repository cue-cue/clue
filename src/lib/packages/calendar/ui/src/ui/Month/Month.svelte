<script lang="ts">
	import { generateClassNames } from '@cluue/utils'
	import dayjs from 'dayjs'
	import Select from '../Select/Select.svelte'
	import { CalendarContext } from '../../lib/context.js'

	interface $$Props {
		class?: string
		value?: Date
	}

	let className = ''
	export { className as class }
	export let value: $$Props['value'] = new Date()

    const context = new CalendarContext().get()
</script>

<Select class={generateClassNames(['CalendarMonth', className])}>
	{dayjs(value).format('MMMM')}
	<svelte:fragment slot="content">
		<ul>
			{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as el}
				<li>
					<button on:click={() => (value = dayjs(value).set('month', el).toDate())}>
						{dayjs(value).set('month', el).format('MMMM')}
					</button>
				</li>
			{/each}
		</ul>
	</svelte:fragment>
</Select>

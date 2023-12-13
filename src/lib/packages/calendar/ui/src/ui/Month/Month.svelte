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

    const {store} = new CalendarContext().get()

    const handler = {
        click(e:MouseEvent, value:number) {
            store.navigator.set('month', value)
        }
    }
</script>

<Select class={generateClassNames(['CalendarMonth', className])}>
	{dayjs($store.navigatorDate).format('MMMM')}
	<svelte:fragment slot="content">
		<ul>
			{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as value}
				<li>
					<button on:click={(e) => handler.click(e, value)}>
						{dayjs(value).set('month', value).format('MMMM')}
					</button>
				</li>
			{/each}
		</ul>
	</svelte:fragment>
</Select>

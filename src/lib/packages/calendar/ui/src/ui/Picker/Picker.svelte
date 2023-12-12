<script lang="ts">
	import { generateClassNames } from '@cluue/utils'
	import PickerNavigator from './PickerNavigator.svelte'
	import PickerContainer from './PickerContainer.svelte'
	import { CalendarContext } from '../../lib/context.js'
	import { createCalendarStore } from '../../lib/store.js'
	import DaysNavigator from '../Days/DaysNavigator.svelte'
	import Days from '../Days/Days.svelte'
	import Time from '../Time/Time.svelte'
	import DaysNames from '../Days/DaysNames.svelte'

	interface $$Props {
		class?: string
		time?: boolean
	}

	let className = ''
	export { className as class }
	export let time:$$Props['time'] = false

	const calendarStore = createCalendarStore()

	$: new CalendarContext().set({
		store: calendarStore
	})

</script>
<pre>{JSON.stringify($calendarStore, null, 2)}</pre>
<div class={generateClassNames(['CalendarPicker', className])}>
	<PickerContainer>
		<PickerNavigator />
		{#if time}
			<DaysNavigator />
		{:else}
			<DaysNames />
		{/if}
		<div class={generateClassNames(['CalendarPicker__main'])}>
			{#if time}
				<Time />
			{:else}
				<Days />
			{/if}
		</div>
	</PickerContainer>
</div>

<style lang="sass">
	.ClueCalendarPicker
		background: var(--clue-color-white)
		box-shadow: 2px 2px 12px 4px rgba(0, 0, 0, .16)
		padding: 10px 0 20px 0
		border-radius: 20px
		width: fit-content
		&__main
			border-top: 1px solid var(--clue-color-gray-10)
			padding-top: 24px
			margin-top: 8px
</style>

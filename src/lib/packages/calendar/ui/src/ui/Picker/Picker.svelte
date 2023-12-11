<script lang="ts">
	import { generateClassNames } from '@cluue/utils'
	import Days from '../Days/Days.svelte'
	import PickerNavigator from './PickerNavigator.svelte'
	import PickerContainer from './PickerContainer.svelte'
	import { CalendarContext } from '../../lib/context.js'
	import { createCalendarStore } from '../../lib/store.js'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }

	const calendarStore = createCalendarStore()

	const context = new CalendarContext().set({
		store: calendarStore
	})

</script>

<div class={generateClassNames(['CalendarPicker', className])}>
	<PickerContainer>
		<PickerNavigator />
		<Days />
		<!-- <Time /> -->
	</PickerContainer>
</div>

<style lang="sass">
	.ClueCalendarPicker
		background: var(--clue-color-white)
		box-shadow: 2px 2px 12px 4px rgba(0, 0, 0, .16)
		padding: 10px 0 20px 0
		border-radius: 20px
		width: fit-content
		:global(.PickerDays)
			width: 100%
</style>

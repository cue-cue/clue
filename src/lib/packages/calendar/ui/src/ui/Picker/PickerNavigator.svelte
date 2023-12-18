<script lang="ts">
	import dayjs from 'dayjs'
	import { generateClassNames } from '@cluue/utils'
	import PickerNavigatorArrow from './PickerNavigatorArrow.svelte'
	import Month from '../Month/Month.svelte'
	import Year from '../Year/Year.svelte'
	import { CalendarContext } from '../../lib/context.js'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }

	const context = new CalendarContext().get()

	const prev = () => {
		context.store.navigator.prev()
	}

	const next = () => {
		context.store.navigator.next()
	}
</script>

<div class={generateClassNames(['CalendarPickerNavigator', className])}>
	<PickerNavigatorArrow on:click={prev} />
	<div>
		<Month />
		<Year />
	</div>
	<PickerNavigatorArrow type="next" on:click={next} />
</div>

<style lang="sass">
	.ClueCalendarPickerNavigator
		display: flex
		align-items: center
		justify-content: space-between
		padding: 8px 10px
		div
			margin: 0 auto
</style>

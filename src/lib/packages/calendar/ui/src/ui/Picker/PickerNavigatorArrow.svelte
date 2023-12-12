<script lang="ts">
	import { generateClassNames } from '@cluue/utils'
	import { Icon } from '@cluue/icons'
	import arrowIcon from '@cluue/icons/line/arrow-left.svg?clue'

	interface $$Props {
		class?: string
		type?: 'prev' | 'next'
	}

	let className = ''
	export { className as class }
	export let type: $$Props['type'] = 'prev'
</script>

<button class={generateClassNames(['CalendarPickerNavigatorArrow', className])} data-type={type} on:click>
	<Icon width={20} icon={arrowIcon} />
</button>

<style lang="sass">
	.ClueCalendarPickerNavigatorArrow
		border: none
		background: none
		cursor: pointer
		&:hover
			--clue-icon-color: var(--clue-color-primary)
		&[data-type='next']
			transform: scaleX(-1)
</style>

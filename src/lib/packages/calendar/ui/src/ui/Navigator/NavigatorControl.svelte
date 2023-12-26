<script lang="ts">
	import { config } from '@cluue/config'
	import { generateClassNames } from '@cluue/utils'
	import { fade } from 'svelte/transition'

	interface $$Props {
		class?: string
		size?: 'small'
		active?: boolean
		hidden?: boolean
	}

	let className = ''
	export { className as class }
	export let size: $$Props['size'] = undefined
	export let active: $$Props['active'] = undefined
	export let hidden: $$Props['hidden'] = undefined
</script>

<button
	class={generateClassNames(['CalendarNavigatorControl', className])}
	data-hidden={hidden}
	data-active={active}
	data-size={size}
	transition:fade={$config.transition}
	on:click
>
	<slot />
</button>

<style lang="sass">
	.ClueCalendarNavigatorControl
		--clue-calendar-navigator-control-min-height: 32px
		--clue-calendar-navigator-control-padding-x: 12px
		--clue-calendar-navigator-control-padding-y: 6px
		display: flex
		align-items: center
		justify-content: center
		border-radius: 5px
		background: none
		min-height: var(--clue-calendar-navigator-control-min-height)
		padding: var(--clue-calendar-navigator-control-padding-y) var(--clue-calendar-navigator-control-padding-x)
		border: none
		cursor: pointer
		text-align: center
		font-weight: 500
		font-size: 16px
		color: var(--clue-color-gray-700)
		transition: var(--clue-transition)
		transition-property: background, opacity
		&:hover
			background: var(--clue-color-gray-10)
		&:active, &[data-active='true']
			background: var(--clue-color-gray-50)
		&[data-size='small']
			--clue-calendar-navigator-control-padding-y: 6px
		&[data-hidden='true']
			opacity: 0
			pointer-events: none
</style>

<script lang="ts">
	import { generateClassNames } from '@cluue/utils'
	import { Icon } from '@cluue/icons'
	import arrowIcon from '@cluue/icons/line/arrow-left.svg?clue'
	import NavigatorControl from './NavigatorControl.svelte'
	import type { ComponentProps } from 'svelte'

	interface $$Props extends ComponentProps<NavigatorControl> {
		class?: string
		type?: 'prev' | 'next'
	}

	let className = ''
	export { className as class }
	export let type: $$Props['type'] = 'prev'
</script>

<NavigatorControl
	class={generateClassNames(['CalendarNavigatorArrow', className])}
	size="small"
	{...$$restProps}
	on:click
>
	<Icon width={20} icon={arrowIcon} reverse={type === 'next' ? 'x' : undefined} />
</NavigatorControl>

<style lang="sass">
	:global(.ClueCalendarNavigatorArrow)
		width: var(--clue-calendar-navigator-control-min-height)
		position: relative
		:global(.ClueIcon)
			position: absolute
			top: calc(50% - 10px)
			left: calc(50% - 10px)
</style>

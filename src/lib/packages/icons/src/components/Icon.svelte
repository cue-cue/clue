<script lang="ts">
	import IconUse from './IconUse.svelte'
	import { generateClassNames } from '@cluue/utils'
	import type { ComponentProps } from 'svelte'

	interface $$Props extends Pick<ComponentProps<IconUse>, 'width' | 'height' | 'icon'> {
		class?: string
		color?: string
		size?: 'small' | 'medium' | 'large'
		reverse?: 'x' | 'y'
	}

	let className = ''
	export { className as class }
	export let icon: $$Props['icon']
	export let width: $$Props['width'] = undefined
	export let height: $$Props['height'] = undefined
	export let color: $$Props['color'] = undefined
	export let size: $$Props['size'] = undefined
	export let reverse: $$Props['reverse'] = undefined

	const sizesMap = new Map<typeof size, Pick<ComponentProps<IconUse>, 'width' | 'height'>>([
		['small', { width: 16, height: 16 }],
		['medium', { width: 24, height: 24 }],
		['large', { width: 32, height: 32 }],
		[undefined, { width, height }]
	])

	$: sizes = sizesMap.get(size)
</script>

<IconUse class={generateClassNames(['Icon', className])} {icon} {...sizes} style={`${color ? `--clue-icon-color: ${color};` : ''}${reverse ? `transform: scale${reverse.toUpperCase()}(-1)` : ''}`} />

<style lang="sass">
	:global(.ClueIcon)
		// --clue-icon-color
		color: var(--clue-icon-color, var(--clue-color-icon))
		transition: var(--clue-transition)
		transition-property: color, transform
</style>

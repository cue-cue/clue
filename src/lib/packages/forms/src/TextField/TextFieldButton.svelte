<script lang="ts">
	import { generateClassNames } from '@cluue/utils'
	import { Icon } from '@cluue/icons'
	import { onMount, type ComponentProps, onDestroy } from 'svelte'
	import type { TransitionConfig } from 'svelte/transition'
	import { config } from '@cluue/config'
	import { textFieldBaseContext, textFieldButtonsContext } from './context.js'
	import { writable } from 'svelte/store'
	interface $$Props extends Omit<ComponentProps<Icon>, 'size' | 'height'> {
		class?: string
	}

	let className = ''
	export { className as class }
	export let icon: $$Props['icon']
	export let width: $$Props['width'] = undefined

	const transitionFunction = (node: HTMLElement): TransitionConfig => {
		const styles = getComputedStyle(node) as unknown as Record<string, string>
		const width = parseInt(styles.width)
		const marginRight = parseInt(styles['margin-right'] || '0')
		const marginLeft = parseInt(styles['margin-left'] || '0')
		const opacity = +styles.opacity
		return {
			delay: $config.transition.delay || 0,
			duration: ($config.transition.duration || 200) / 2,
			css: (t) => {
				const eased = t
				const res = `
					opacity: ${eased * opacity};
					width: ${eased * width}px;
					margin-right: ${eased * marginRight}px;
					margin-left: ${eased * marginLeft}px;
				`
				return res
			},
		}
	}

	const iconSizeMap = new Map<typeof $textFieldBaseContextStore.size, number>([
		['small', 20],
		['medium', 24],
		[undefined, 24],
	])

	const textFieldBaseContextStore = textFieldBaseContext.get() || writable({})

	const textFieldButtonsContextStore = textFieldButtonsContext.get()

	onMount(() => {
		if (textFieldButtonsContextStore) {
			$textFieldButtonsContextStore.count += 1
		}
	})

	onDestroy(() => {
		if (textFieldButtonsContextStore) {
			$textFieldButtonsContextStore.count -= 1
		}
	})
</script>

<button
	on:click
	class={generateClassNames(['TextFieldButton', className])}
	transition:transitionFunction
>
	<Icon
		{icon}
		width={width ?? iconSizeMap.get($textFieldBaseContextStore.size)}
		{...$$restProps}
	/>
</button>

<style lang="sass">
	@import './TextFieldButton'
	:global(body)
		+text-field-button-vars()
	.ClueTextFieldButton
		padding: 0
		margin: 0
		position: relative
		background: none
		border: none
		outline: none
		display: flex
		align-items: center
		justify-content: center
		cursor: pointer
		transition: var(--clue-transition)
		transition-timing-function: linear
		transition-property: margin, transform
		&:hover
			:global(.ClueIcon)
				--clue-icon-color: var(--clue-color-primary-500)
		&::before
			content: ''
			position: absolute
			top: 50%
			left: 50%
			transform: translate(-50%, -50%)
			width: var(--clue-text-field-button-click-area-size)
			height: var(--clue-text-field-button-click-area-size)
		:global(.ClueIcon)
			flex: none
</style>

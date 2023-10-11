<script lang='ts'>
	import {generateClassNames} from '@clue/utils'
	import {Icon} from '@clue/icons'
	import type { ComponentProps } from 'svelte';
	import type { TransitionConfig } from 'svelte/transition'
	import { config } from '$lib/packages/config.js'

	interface $$Props extends ComponentProps<Icon> {
		class?:string
	}
	
	let className = ''
	export { className as class }
	export let icon:$$Props['icon']
	export let width:$$Props['width'] = 24
	export let height:$$Props['width'] = undefined

	const transitionFunction = (node:HTMLElement):TransitionConfig => {
		const styles = getComputedStyle(node) as unknown as Record<string, string>
		const width = parseInt(styles.width);
		const marginRight = parseInt(styles['margin-right'] || '0');
		const marginLeft = parseInt(styles['margin-left'] || '0');
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
			}
		}
	}

</script>

<button on:click class={generateClassNames(['TextFieldButton', className])} transition:transitionFunction>
	<Icon {icon} {width} {height} {...$$restProps}/>
</button>

<style lang='sass'>
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
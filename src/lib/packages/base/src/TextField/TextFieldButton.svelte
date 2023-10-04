<script lang='ts'>
	import {generateClassNames} from '@clue/utils'
	import {Icon} from '@clue/icons'
	import type { ComponentProps } from 'svelte';

	interface $$Props extends ComponentProps<Icon> {
		class?:string
	}
	
	let className = ''
	export { className as class }
	export let icon:$$Props['icon']
	export let width:$$Props['width'] = 24
	export let height:$$Props['width'] = undefined
</script>

<button on:click class={generateClassNames(['TextFieldButton', className])}>
	<Icon {icon} {width} {height} {...$$restProps}/>
</button>

<style lang='sass'>
	.ClueTextFieldButton
		--clue-text-field-button-click-area-size: 24px
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
		&:hover
			:global(.ClueIcon)
				--clue-icon-color: var(--clue-color-icon-secondary)
		&::before
			content: ''
			position: absolute
			top: 50%
			left: 50%
			transform: translate(-50%, -50%)
			width: var(--clue-text-field-button-click-area-size)
			height: var(--clue-text-field-button-click-area-size)
</style>
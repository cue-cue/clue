<script lang='ts'>
	import {generateClassNames} from '@clue/utils'
	import { textFieldButtonsContext } from './context.js'
	import { writable } from 'svelte/store'
	import { onMount } from 'svelte'

	interface $$Props {
		class?:string
		autoHide?:boolean
	}
	
	let className = ''
	export { className as class }
	export let autoHide:$$Props['autoHide'] = true

	const textFieldButtonsContextStore = textFieldButtonsContext.set(writable({count: 0, mounted: false}))

	$: isHidden = autoHide && $textFieldButtonsContextStore.count <= 0 && $textFieldButtonsContextStore.mounted

	onMount(() => $textFieldButtonsContextStore.mounted = true)
</script>

<div class={generateClassNames(['TextFieldButtons', className])} data-hidden={isHidden}>
	<slot/>
</div>

<style lang='sass'>
	.ClueTextFieldButtons
		display: flex
		align-items: center
		transition: calc(var(--clue-transition-duration) / 2)
		transition-timing-function: linear
		transition-property: margin, opacity
		:global(.ClueTextFieldButton)
			position: relative
			&:not(:last-child)
				margin-right: 24px
				&::after
					opacity: 1
			&::after
				content: ''
				opacity: 0
				pointer-events: none
				width: 1px
				height: 16px
				background: var(--clue-color-border)
				display: block
				position: absolute
				right: -12px
				top: 50%
				transform: translateY(-50%)
				transition: var(--clue-transition)
				transition-property: opacity
</style>
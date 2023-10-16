<script lang='ts'>
	import {generateClassNames} from '@cluue/utils'
	import { textFieldBaseContext, textFieldButtonsContext } from './context.js'
	import { writable } from 'svelte/store'
	import { onMount } from 'svelte'

	interface $$Props {
		class?:string
		autoHide?:boolean
		size?:'small' | 'medium' | 'large'
	}
	
	let className = ''
	export { className as class }
	export let autoHide:$$Props['autoHide'] = true
	export let size:$$Props['size'] = undefined


	const textFieldBaseContextStore = textFieldBaseContext.get()
	const textFieldButtonsContextStore = textFieldButtonsContext.set(writable({count: 0, mounted: false}))

	$: isHidden = autoHide && $textFieldButtonsContextStore.count <= 0 && $textFieldButtonsContextStore.mounted

	$: if (textFieldBaseContextStore) {
		size = $textFieldBaseContextStore.size
	}

	onMount(() => $textFieldButtonsContextStore.mounted = true)
</script>

<div class={generateClassNames(['TextFieldButtons', className])} data-hidden={isHidden} data-size={size}>
	<slot/>
</div>

<style lang='sass'>
	.ClueTextFieldButtons
		--gap: 24px
		display: flex
		align-items: center
		transition: calc(var(--clue-transition-duration) / 2)
		transition-timing-function: linear
		transition-property: margin, opacity
		&[data-size='small']
			--gap: 20px
		:global(.ClueTextFieldButton)
			position: relative
			&:not(:last-child)
				margin-right: var(--gap)
				&::after
					opacity: 1
			&::after
				content: ''
				opacity: 0
				pointer-events: none
				width: 1px
				height: 66.6%
				background: var(--clue-color-border)
				display: block
				position: absolute
				right: calc(var(--gap) / 2 * -1)
				top: 50%
				transform: translateY(-50%)
				transition: var(--clue-transition)
				transition-property: opacity
</style>
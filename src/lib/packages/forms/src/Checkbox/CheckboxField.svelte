<script lang='ts'>

	import {generateClassNames, randomId} from '@cluue/utils'
	import type { HTMLInputAttributes } from 'svelte/elements'
	import { fieldContext } from '../FieldContext/index.js'

	interface $$Props extends Pick<HTMLInputAttributes, 'id'> {
		class?:string
		manual?:boolean
	}
	
	let className = ''
	export { className as class }
	export let id:$$Props['id'] = undefined
	export let manual:$$Props['manual'] = undefined

	const fieldContextStore = fieldContext.get()

	const handler = {
		click(e:MouseEvent) {
			if ($fieldContextStore.manual || manual) e.preventDefault()
		}
	}
	
	
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<label for={id} on:click={handler.click} class={generateClassNames(['CheckboxField', className])}>
	<slot/>
	<span class={generateClassNames(['CheckboxField__label'])}></span>
</label>

<style lang='sass'>
	@import './CheckboxField'
	:global(body)
		+checkbox-field-vars()
	.ClueCheckboxField
		$root: &
		$label: #{$root}__label
		--border-radius: var(--clue-checkbox-field-border-radius)
		width: var(--clue-checkbox-field-width)
		height: var(--clue-checkbox-field-height)
		flex: none
		&__label
			display: inline-block
			width: 100%
			height: 100%
			flex: none
			box-sizing: border-box
			cursor: pointer
			position: relative
			background-color: var(--clue-checkbox-field-background-color)
			border-radius: var(--border-radius)
			border: var(--clue-checkbox-field-border-width) solid var(--clue-checkbox-field-border-color)
			transition: var(--clue-transition)
			transition-property: border, background, border-radius, width, height
		:global(input)
			display: none
		:global(input:not(:checked):not(:disabled) ~ #{$label})
			@at-root :global([data-clue-checkbox-field-hover-trigger]):hover &, &:hover
				border-color: var(--clue-checkbox-field-border-color-hover)
				background-color: var(--clue-checkbox-field-background-color-hover)
		:global(input:disabled ~ #{$label})
			cursor: not-allowed
			border-color: var(--clue-checkbox-field-border-color-disabled)
			background-color: var(--clue-checkbox-field-background-color-disabled)
		:global(input:disabled:checked ~ #{$label})
			background-color: var(--clue-checkbox-field-checked-background-color-disabled)
			border-color: var(--clue-checkbox-field-checked-border-color-disabled)
		:global(input:not(:disabled):checked ~ #{$label})
			background-color: var(--clue-checkbox-field-checked-background-color)
			border-color: var(--clue-checkbox-field-checked-border-color)
			@at-root :global([data-clue-checkbox-field-hover-trigger]):hover &, &:hover
				border-color: var(--clue-checkbox-field-checked-border-color-hover)
				background-color: var(--clue-checkbox-field-checked-background-color-hover)
</style>
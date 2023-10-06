<script lang='ts'>

	import {generateClassNames, randomId} from '@clue/utils'
	import type { HTMLInputAttributes } from 'svelte/elements'

	interface $$Props extends Pick<HTMLInputAttributes, 'id'> {
		class?:string
	}
	
	let className = ''
	export { className as class }
	export let id:$$Props['id'] = undefined
	
</script>
<label for={id} class={generateClassNames(['CheckboxField', className])}>
	<slot/>
	<span class={generateClassNames(['CheckboxField__label'])}></span>
</label>

<style lang='sass'>
	@import './CheckboxField'
	:global(:root)
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
			@at-root :global(.ClueLabel__main):hover &, &:hover
				border-color: var(--clue-checkbox-field-border-color-hover)
				background-color: var(--clue-checkbox-field-background-color-hover)
		:global(input:disabled ~ #{$label})
			cursor: not-allowed
			border-color: var(--clue-checkbox-field-border-color-disabled)
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
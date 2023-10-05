<script lang='ts'>
	import {generateClassNames, randomId} from '@clue/utils'
	import type { ComponentProps } from 'svelte';
	import CheckboxInput from './CheckboxInput.svelte';

	type T = $$Generic<'radio' | 'checkbox'>

	interface $$Props extends Omit<ComponentProps<CheckboxInput<T>>, 'type'> {
		class?:string
		type?:T
		nodeElement?:HTMLLabelElement
	}
	
	let className = ''
	export { className as class }

	export let checked:$$Props['checked'] = false
	export let type:T = 'checkbox' as T
	export let disabled:$$Props['disabled'] = undefined
	export let id:$$Props['id'] = randomId('checkbox')
	export let nodeElement:$$Props['nodeElement'] = undefined
	export let group:$$Props['group'] = undefined
	export let value:$$Props['value'] = undefined
	
</script>
<label bind:this={nodeElement} for={id} class={generateClassNames(['CheckboxBase', className])} data-checked={checked} data-disabled={disabled}>
	<CheckboxInput bind:group bind:value {id} {type} bind:checked {disabled} {...$$restProps}/>
</label>

<style lang='sass'>
	@import './CheckboxBase'
	:global(:root)
		+checkbox-base-vars()
	.ClueCheckboxBase
		$root: &
		display: inline-block
		width: var(--clue-checkbox-base-size)
		height: var(--clue-checkbox-base-size)
		flex: none
		cursor: pointer
		position: relative
		border-radius: var(--clue-checkbox-base-border-radius)
		background-color: var(--clue-checkbox-base-background-color)
		border-radius: var(--clue-checkbox-base-border-radius)
		border: var(--clue-checkbox-base-border-width) solid var(--clue-checkbox-base-border-color)
		transition: var(--clue-transition)
		transition-property: border, background, border-radius, width, height
		&[data-disabled]
			cursor: not-allowed
			border-color: var(--clue-checkbox-base-border-color-disabled)
		&:not(&[data-checked="true"], &[data-disabled])
			@at-root :global([data-clue-checkbox-base-hover-trigger]):hover &, &:hover
				border-color: var(--clue-checkbox-base-border-color-hover)
				background-color: var(--clue-checkbox-base-background-color-hover)
		&[data-checked="true"]
			&[data-disabled]
				background-color: var(--clue-checkbox-base-checked-background-color-disabled)
				border-color: var(--clue-checkbox-base-checked-border-color-disabled)
			&:not(&[data-disabled])
				background-color: var(--clue-checkbox-base-checked-background-color)
				border-color: var(--clue-checkbox-base-checked-border-color)
				&:hover
					border-color: var(--clue-checkbox-base-checked-border-color-hover)
					background-color: var(--clue-checkbox-base-checked-background-color-hover)
		&::after
			content: ''
			position: absolute
			top: 50%
			left: 50%
			transform: translate(-50%, -50%)
			width: 100%
			height: 100%
			background-image: var(--clue-checkbox-base-background-image)
			background-repeat: no-repeat
			background-size: 12px 10px
			background-position: center center
		:global(.ClueCheckboxInput)
			// display: none
</style>
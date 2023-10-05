<script lang='ts'>
	import InputCheckbox from '../Input/InputCheckbox.svelte'

	import {generateClassNames, randomId} from '@clue/utils'
	import type { ComponentProps } from 'svelte';

	interface $$Props extends Omit<ComponentProps<InputCheckbox>, 'group' | 'value'> {
		class?:string
		nodeElement?:HTMLLabelElement
		group?:ComponentProps<InputCheckbox>['group']
		value?:ComponentProps<InputCheckbox>['value']
	}
	
	let className = ''
	export { className as class }

	export let checked:$$Props['checked'] = undefined
	export let disabled:$$Props['disabled'] = undefined
	export let id:$$Props['id'] = randomId('checkbox')
	export let nodeElement:$$Props['nodeElement'] = undefined
	export let group:Exclude<$$Props['group'], undefined> = []
	export let value:Exclude<$$Props['value'], undefined> = ''
	
</script>
<label bind:this={nodeElement} for={id} class={generateClassNames(['CheckboxBase', className])} data-disabled={disabled}>
	<InputCheckbox bind:group bind:value {id} bind:checked {disabled} {...$$restProps}/>
	<span></span>
</label>

<style lang='sass'>
	@import './CheckboxBase'
	:global(:root)
		+checkbox-base-vars()
	.ClueCheckboxBase
		$root: &
		--border-radius: var(--clue-checkbox-base-border-radius)
		width: var(--clue-checkbox-base-size)
		height: var(--clue-checkbox-base-size)
		span
			display: inline-block
			width: 100%
			height: 100%
			flex: none
			box-sizing: border-box
			cursor: pointer
			position: relative
			background-color: var(--clue-checkbox-base-background-color)
			border-radius: var(--border-radius)
			border: var(--clue-checkbox-base-border-width) solid var(--clue-checkbox-base-border-color)
			transition: var(--clue-transition)
			transition-property: border, background, border-radius, width, height
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
		:global(.ClueInputCheckbox)
			display: none
		&:not([data-disabled])
			:global(.ClueInputCheckbox:not(:checked) ~ span)
				@at-root :global(.ClueLabel__main):hover &, &:hover
					border-color: var(--clue-checkbox-base-border-color-hover)
					background-color: var(--clue-checkbox-base-background-color-hover)
		&[data-disabled]
			span
				cursor: not-allowed
				border-color: var(--clue-checkbox-base-border-color-disabled)
			:global(.ClueInputCheckbox:checked ~ span)
				background-color: var(--clue-checkbox-base-checked-background-color-disabled)
				border-color: var(--clue-checkbox-base-checked-border-color-disabled)
		&:not([data-disabled])
			:global(.ClueInputCheckbox:checked ~ span)
				background-color: var(--clue-checkbox-base-checked-background-color)
				border-color: var(--clue-checkbox-base-checked-border-color)
				@at-root :global(.ClueLabel__main):hover &, &:hover
					border-color: var(--clue-checkbox-base-checked-border-color-hover)
					background-color: var(--clue-checkbox-base-checked-background-color-hover)
</style>
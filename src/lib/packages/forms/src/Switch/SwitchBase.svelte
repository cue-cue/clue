<script lang='ts'>
	import {generateClassNames, randomId} from '@clue/utils'
	import InputCheckbox from '../Input/InputCheckbox.svelte'
	import CheckboxField from '../Checkbox/CheckboxField.svelte'
	import type { ComponentProps } from 'svelte'

	interface $$Props extends Omit<ComponentProps<InputCheckbox>, 'group' | 'value'> {
		class?:string
		group?:ComponentProps<InputCheckbox>['group']
		value?:ComponentProps<InputCheckbox>['value']
	}
	
	let className = ''
	export { className as class }

	export let checked:$$Props['checked'] = undefined
	export let disabled:$$Props['disabled'] = undefined
	export let id:$$Props['id'] = randomId('checkbox')
	export let group:Exclude<$$Props['group'], undefined> = []
	export let value:Exclude<$$Props['value'], undefined> = ''
	
</script>

<CheckboxField {id} class={generateClassNames(['SwitchBase', className])}>
	<InputCheckbox bind:group bind:value {id} bind:checked {disabled} {...$$restProps}/>
</CheckboxField>

<style lang='sass'>
	@import './SwitchBase'
	:global(:root)
		+switch-base-vars()
	:global(.ClueSwitchBase)
		--clue-checkbox-field-width: var(--clue-switch-base-width)
		--clue-checkbox-field-height: var(--clue-switch-base-height)

		--clue-checkbox-field-checked-background-color-disabled: var(--clue-switch-checked-background-color-disabled)

		--clue-checkbox-field-border-radius: var(--clue-switch-base-height)
		--clue-checkbox-field-border-color-disabled: var(--clue-switch-checked-border-color-disabled)
		
		--thumb-space: calc((var(--clue-switch-base-height) - var(--clue-switch-thumb-height)) / 2 - var(--clue-checkbox-field-border-width))

		:global(input:disabled ~ .ClueCheckboxField__label)
			&::after
				background-color: var(--clue-switch-thumb-background-color-disabled)
		:global(input:disabled:checked ~ .ClueCheckboxField__label)
			&::after
				background-color: var(--clue-switch-thumb-checked-background-color-disabled)
		:global(input:not(:disabled):not(:checked) ~ .ClueCheckboxField__label)
			@at-root :global([data-clue-checkbox-field-hover-trigger]):hover &, &:hover
				&::after
					background-color: var(--clue-switch-thumb-background-color-hover)
		:global(input:checked ~ .ClueCheckboxField__label)
			&::after
				left: calc(100% - var(--clue-switch-thumb-height) - var(--thumb-space))
				background-color: var(--clue-switch-thumb-checked-background-color)
		:global(.ClueCheckboxField__label)
			&::after
				content: ''
				position: absolute
				top: 50%
				left: var(--thumb-space)
				transform: translateY(-50%)
				width: var(--clue-switch-thumb-width)
				height: var(--clue-switch-thumb-height)
				border-radius: var(--clue-switch-thumb-border-radius)
				background-color: var(--clue-switch-thumb-background-color)
				transition: var(--clue-transition)
				transition-property: background, left
</style>
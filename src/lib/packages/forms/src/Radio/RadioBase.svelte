<script lang='ts'>
	import {generateClassNames, randomId} from '@clue/utils'
	import type { ComponentProps } from 'svelte';
	import InputRadio from '../Input/InputRadio.svelte'
	import CheckboxField from '../Checkbox/CheckboxField.svelte'

	interface $$Props extends Omit<ComponentProps<InputRadio>, 'group' | 'value'> {
		class?:string
		group?:ComponentProps<InputRadio>['group']
		value?:ComponentProps<InputRadio>['value']
	}
	
	let className = ''
	export { className as class }

	export let disabled:$$Props['disabled'] = undefined
	export let id:$$Props['id'] = randomId('checkbox')
	export let group:$$Props['group'] = undefined
	export let value:$$Props['value'] = undefined
	
</script>

<CheckboxField {id} class={generateClassNames(['RadioBase', className])}>
	<InputRadio bind:group {value} {id} {disabled} {...$$restProps}/>
</CheckboxField>

<style lang='sass'>
	@import './RadioBase'
	:global(body)
		+radio-base-vars()
	:global(.ClueRadioBase)
		--clue-checkbox-field-border-radius: var(--clue-radio-base-border-radius)
		--clue-checkbox-field-checked-background-color-disabled: var(--clue-radio-base-checked-background-color-disabled)
		:global(input:checked:disabled ~ .ClueCheckboxField__label)
			&::after
				background: var(--clue-radio-base-checked-thumb-background-color-disabled)
		:global(input:checked ~ .ClueCheckboxField__label)
			&::after
				opacity: 1
		:global(.ClueCheckboxField__label)
			&::after
				content: ''
				position: absolute
				top: 50%
				left: 50%
				transform: translate(-50%, -50%)
				width: 8px
				height: 8px
				background: var(--clue-radio-base-thumb-background-color)
				border-radius: 50%
				opacity: 0
				transition: var(--clue-transition)
				transition-property: background, opacity
</style>
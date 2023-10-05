<script lang='ts'>
	import InputCheckbox from '../Input/InputCheckbox.svelte'

	import {generateClassNames, randomId} from '@clue/utils'
	import type { ComponentProps } from 'svelte';
	import CheckboxField from './CheckboxField.svelte'

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

<CheckboxField {id} class={generateClassNames(['CheckboxBase', className])}>
	<InputCheckbox bind:group bind:value {id} bind:checked {disabled} {...$$restProps}/>
</CheckboxField>

<style lang='sass'>
	@import './CheckboxBase'
	:global(:root)
		+checkbox-base-vars()
	:global(.ClueCheckboxBase)
		:global(.ClueCheckboxField__label)
			&::after
				content: ''
				position: absolute
				top: 50%
				left: 50%
				transform: translate(-50%, -50%)
				width: 100%
				height: 100%
				background-image: var(--clue-checkbox-base-icon)
				background-repeat: no-repeat
				background-size: 12px 10px
				background-position: center center
</style>
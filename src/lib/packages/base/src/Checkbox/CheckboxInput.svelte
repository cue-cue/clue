<script lang='ts'>
	import InputRadio from '../Input/InputRadio.svelte';
	import InputCheckbox from '../Input/InputCheckbox.svelte';

	import type { ComponentProps } from 'svelte';
	import {generateClassNames} from '@clue/utils'
	type T = $$Generic<'radio' | 'checkbox'>

	type BaseProps = ComponentProps<InputCheckbox>
	type RadioProps = ComponentProps<InputRadio>
		
	interface $$Props extends Omit<BaseProps, 'value' | 'checked' | 'group' | 'type'> {
		class?:string
		type:T
		group?: T extends 'radio' ? RadioProps['group'] : BaseProps['group']
		checked?:boolean
		value?:string
	}
	
	let className = ''
	export { className as class }
	export let type:$$Props['type']
	export let group:$$Props['group'] = undefined
	export let checked:$$Props['checked'] = undefined
	export let value:$$Props['value'] = undefined
	
	const componentsMap = new Map<'radio' | 'checkbox', ConstructorOfATypedSvelteComponent>([
		['radio', InputRadio],
		['checkbox', InputCheckbox],
	])

</script>

<svelte:component
	this={componentsMap.get(type)}
	class={generateClassNames(['CheckboxBase', className])}
	bind:group
	bind:checked
	{value}
	{...$$restProps}
/>
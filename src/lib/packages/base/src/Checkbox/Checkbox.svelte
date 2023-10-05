<script lang='ts'>
	import {generateClassNames} from '@clue/utils'
	import type { ComponentProps } from 'svelte';
	import CheckboxField from './CheckboxField.svelte';

	interface $$Props extends Omit<ComponentProps<CheckboxField<'checkbox'>>, 'type'> {
		class?:string
	}
	
	let className = ''
	export { className as class }
	export let group:$$Props['group'] = undefined
	export let checked:$$Props['checked'] = undefined
</script>

<CheckboxField
	type='checkbox'
	class={generateClassNames(['Checkbox', className])}
	bind:group
	bind:checked
	{...$$restProps}
/>
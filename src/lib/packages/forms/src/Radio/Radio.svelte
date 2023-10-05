<script lang='ts'>
	import {generateClassNames} from '@clue/utils'
	import type { ComponentProps } from 'svelte';
	// import CheckboxFieldLabel from '../Checkbox/CheckboxFieldLabel.svelte'

	interface $$Props extends Omit<ComponentProps<CheckboxField<'radio'>>, 'type' | 'checked'> {
		class?:string
	}
	interface $$Slots {
		default: {
			label: typeof CheckboxFieldLabel
		}
	}
	
	let className = ''
	export { className as class }
	export let group:$$Props['group'] = undefined
	export let id:$$Props['id'] = undefined
	export let checked:boolean = false

	checked = false
</script>
<!-- 
<CheckboxField
	type='radio'
	class={generateClassNames(['Radio', className])}
	bind:group
	bind:id
	{...$$restProps}
>
	<slot label={CheckboxFieldLabel}/>
</CheckboxField> -->
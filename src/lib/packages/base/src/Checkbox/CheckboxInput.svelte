<script lang='ts'>
	import {generateClassNames} from '@clue/utils'
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface $$Props extends Omit<HTMLInputAttributes, 'type'> {
		class?:string
		type?:Extract<HTMLInputAttributes['type'], 'checkbox' | 'radio'>
	}
	
	let className = ''
	export { className as class }

	export let checked:$$Props['checked'] = false
	
</script>

<input type='checkbox' {...$$restProps} bind:checked class={generateClassNames(['CheckboxInput', className])}/>
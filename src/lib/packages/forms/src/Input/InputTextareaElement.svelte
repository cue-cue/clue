<script lang='ts'>
	import {generateClassNames} from '@clue/utils'
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	interface $$Props extends HTMLTextareaAttributes {
		class?:string
	}
	
	let className = ''
	export { className as class }

	export let value:$$Props['value'] = ''
	
</script>

<textarea
	bind:value
	class={generateClassNames([className])}
	on:input
    on:change
    on:keydown
    on:keyup
    on:click
    on:focus
    on:blur
	{...$$restProps}
></textarea>
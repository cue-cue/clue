<script lang='ts'>
	import {generateClassNames} from '@clue/utils'
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface $$Props extends HTMLInputAttributes {
		class?:string
	}
	
	let className = ''
	export { className as class }

	export let value:$$Props['value'] = ''
	
</script>

<input
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
/>
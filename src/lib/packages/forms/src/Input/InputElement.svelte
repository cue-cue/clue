<script lang='ts'>
	import {generateClassNames} from '@clue/utils'
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface $$Props extends HTMLInputAttributes {
		class?:string
		nodeElement?:HTMLElement
	}
	
	let className = ''
	export { className as class }

	export let value:$$Props['value'] = ''
	export let nodeElement:$$Props['nodeElement'] = undefined
	
</script>

<input
	bind:value
	bind:this={nodeElement}
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
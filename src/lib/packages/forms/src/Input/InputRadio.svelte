<script lang='ts'>
	import {generateClassNames} from '@clue/utils'
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface $$Props extends Omit<HTMLInputAttributes, 'type' | 'checked'> {
		class?:string
		group?:string | number
		id?:string
	}
	
	let className = ''
	export { className as class }

	export let group:$$Props['group'] = undefined
	export let value:$$Props['value'] = undefined
	export let checked:boolean = false
	checked = false
</script>
<input
	class={generateClassNames(['InputRadio', className])}
	type="radio"
	bind:group
	on:keyup 
	on:keydown 
	on:keypress 
	on:focus 
	on:blur 
	on:click 
	on:mouseover 
	on:mouseenter 
	on:mouseleave 
	on:paste
	on:change
	{value}
	{...$$restProps}
/>
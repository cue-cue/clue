<script>import { generateClassNames } from "@clue/utils";
let className = "";
export { className as class };
export let group = void 0;
export let value = void 0;
export let checked = false;
checked = false;
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
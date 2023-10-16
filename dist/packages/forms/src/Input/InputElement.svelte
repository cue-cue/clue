<script>import { generateClassNames } from "@clue/utils";
let className = "";
export { className as class };
export let value = "";
export let nodeElement = void 0;
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
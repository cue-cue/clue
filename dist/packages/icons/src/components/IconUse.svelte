<script>import { generateClassNames } from "@cluue/utils";
import { fade } from "svelte/transition";
import { config } from "@cluue/config";
let className = "";
export { className as class };
export let icon;
export let width = void 0;
export let height = void 0;
export let nodeElement = void 0;
export let transitionFn = void 0;
$:
  sizes = {
    width: width ?? 24,
    height: height ?? width ?? 24
  };
$:
  transition = transitionFn ?? fade;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<svg
	bind:this={nodeElement}
	class={generateClassNames(['IconUse', className])}
	role='img'
	{...$$restProps}
	{...sizes}
	viewBox={`0 0 ${sizes.width} ${sizes.height}`}
	on:click
>
	{#key icon}
		<use transition:transition={$config.transition} xlink:href={`#${icon}`} />
	{/key}
</svg>
<script>import { generateClassNames } from "@cluue/utils";
import LabelName from "./LabelName.svelte";
let className = "";
export { className as class };
export let slots = void 0;
</script>

<div class={generateClassNames(['Label', className])}>
	<div class={generateClassNames(['Label__main'])} data-clue-checkbox-field-hover-trigger data-clue-label-name-hover-trigger>
		<slot/>
		{#if $$slots.label && (slots?.label ?? true)}
			<slot name='label' Component={LabelName}/>
		{/if}
	</div>
	{#if $$slots.desc && (slots?.desc ?? true)}
		<slot name='desc'/>
	{/if}
</div>

<style>.ClueLabel__main {
  display: flex;
  align-items: center;
  pointer-events: none;
}
.ClueLabel__main > :global(*) {
  pointer-events: auto;
}
.ClueLabel__main :global(.ClueLabelName) {
  margin-left: 8px;
}</style>
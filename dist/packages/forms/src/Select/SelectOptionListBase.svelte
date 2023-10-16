<script>import { generateClassNames } from "@clue/utils";
let className = "";
export { className as class };
</script>
<svelte:options accessors/>

<ul class={generateClassNames(['SelectOptionListBase', className])}>
	<slot/>
</ul>

<style>.ClueSelectOptionList {
  background: var(--clue-color-white);
  border-radius: 0 0 10px 10px;
  box-shadow: var(--clue-shadow);
  list-style: none;
  padding: 12px;
  overflow: auto;
}
.ClueSelectOptionList :global(.ClueSelectOption) {
  width: 100%;
}</style>
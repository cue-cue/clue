<script>import { selectOptionListCoreContext } from "./context.js";
import { generateClassNames } from "@cluue/utils";
import SelectOption from "./SelectOption.svelte";
import SelectOptionListBase from "./SelectOptionListBase.svelte";
let className = "";
export { className as class };
export let data = [];
const selectOptionListCoreContextStore = selectOptionListCoreContext.get();
$:
  if (selectOptionListCoreContextStore) {
    data = $selectOptionListCoreContextStore.data;
  }
</script>

<SelectOptionListBase class={generateClassNames(['SelectOptionList', className])}>
	{#if data}
		{#each data as {key, active, label, clickHandler} (key)}
			<SelectOption on:click={clickHandler} {active}>{label}</SelectOption>
		{/each}
	{/if}
</SelectOptionListBase>

<style>:global(.ClueSelectOptionList) {
  background: var(--clue-color-white);
  border-radius: 0 0 10px 10px;
  box-shadow: var(--clue-shadow);
  list-style: none;
  padding: 12px;
  overflow: auto;
}
:global(.ClueSelectOptionList) :global(.ClueSelectOption) {
  width: 100%;
}</style>
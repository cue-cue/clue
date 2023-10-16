<script>import PopoverContent from "../../../popover/src/PopoverContent/PopoverContent.svelte";
import { getOptionValueKey } from "./utils.js";
import SelectOptionListCore from "./SelectOptionListCore.svelte";
import SelectOptionList from "./SelectOptionList.svelte";
import { generateClassNames, outclick, createAction } from "@clue/utils";
import SelectBase from "./SelectBase.svelte";
import TextField from "../TextField/TextField.svelte";
import { Popover } from "@clue/popover";
let className = "";
export { className as class };
export let open = false;
export let options;
export let multiple = false;
export let value = void 0;
export let allowSearch = false;
export let disabled = false;
export let readonly = false;
export let error = false;
export let searchFilter = void 0;
export let key = void 0;
export let label = void 0;
export let helper = void 0;
export let hint = void 0;
export let valueType = void 0;
let searchValue = "";
let setOpen;
let clear;
const handler = {
  outclick() {
    setOpen?.(false);
  },
  clear() {
    clear?.();
  }
};
const getInputValue = (value2) => {
  const foundOptions = options.filter((option) => {
    if (Array.isArray(value2)) {
      return value2.some((val) => getOptionValueKey(option.value, key) === getOptionValueKey(val, key));
    }
    return getOptionValueKey(option.value, key) === getOptionValueKey(value2, key);
  });
  const labels = foundOptions.map(({ label: label2 }) => label2);
  return labels.join(", ");
};
let inputValue = getInputValue(value);
$:
  inputValue = getInputValue(value);
$:
  filter = (option) => {
    if (!allowSearch)
      return true;
    if (searchFilter) {
      return searchFilter(option, searchValue || "");
    } else if (!searchValue) {
      return true;
    }
    return !!option.label?.toLowerCase().includes(searchValue.toLowerCase());
  };
</script>
<small>
	open: {open}<br>
	multiple: {multiple}<br>
	allowSearch: {allowSearch}<br>
	allowClear: {$$restProps.allowClear || true}<br>
	disabled: {disabled}<br>
	readonly: {readonly}<br>
	key: {key || 'id'}<br>
	valueType: {valueType || 'key'}<br>
	error: {error}<br>
	value {JSON.stringify(value)}
</small>
<div
	class={generateClassNames(['Select', className])}
	use:outclick
	on:outclick={handler.outclick}
>
	<Popover let:targetAction placement='bottom' trigger={false} bind:open>
		<TextField {disabled} {error} {readonly} {label} {helper} {hint}>
			<svelte:fragment slot='base' let:id>
				<SelectBase
					{allowSearch}
					{disabled}
					{readonly}
					{error}
					{id}
					use={[
						createAction('targetAction', targetAction)
					]}
					bind:open
					bind:value={inputValue}
					bind:searchValue
					bind:setOpen
					on:open
					on:close
					on:toggle
					on:clear={handler.clear}
				/>
			</svelte:fragment>
		</TextField>
		<svelte:fragment slot='content-wrapper' let:open>
			<SelectOptionListCore {valueType} {options} {readonly} {disabled} {key} {filter} {multiple} bind:clear bind:value>
				{#if open}
					<PopoverContent class={generateClassNames(['SelectPopoverContent', className])}>
						<SelectOptionList/>
					</PopoverContent>
				{/if}
			</SelectOptionListCore>
		</svelte:fragment>
	</Popover>
</div>

<style>.ClueSelect {
  position: relative;
}
.ClueSelect :global(.ClueSelectOptionList) {
  max-height: min(400px, 80vh);
  width: 100%;
}

:global(.ClueSelectPopoverContent) {
  width: 100%;
}</style>
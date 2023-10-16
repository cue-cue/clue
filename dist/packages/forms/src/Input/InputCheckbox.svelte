<script>import { generateClassNames } from "@clue/utils";
import { onMount, tick } from "svelte";
let className = "";
export { className as class };
export let checked = void 0;
export let group = [];
export let value;
export let manual = false;
const onChange = () => {
  typeof group === "string" && (group = [group]);
  const index = group.indexOf(value);
  if (checked === void 0)
    checked = index >= 0;
  if (checked) {
    if (index < 0) {
      group.push(value);
      group = group;
    }
  } else {
    if (index >= 0) {
      group.splice(index, 1);
      group = group;
    }
  }
};
const onClick = (e) => {
  if (manual)
    e.preventDefault();
};
const init = (node, _group) => {
  const update = (_group2) => {
    checked = _group2.includes(value);
  };
  if (checked === void 0)
    update(_group);
  onChange();
  return {
    update
  };
};
onChange();
</script>

<input
	class={generateClassNames(['InputCheckbox', className])}
	use:init={group}
	type="checkbox"
	bind:checked
	on:keyup
	on:keydown
	on:keypress
	on:focus
	on:blur
	on:click={onClick}
	on:click
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:paste
	on:change={onChange}
	on:change
	{value}
	{...$$restProps}
/>

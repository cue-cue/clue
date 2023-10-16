<script>import { generateClassNames } from "@clue/utils";
let className = "";
export { className as class };
export let tag = "button";
export let disabled = void 0;
export let type = "primary";
$:
  disabledAttributes = tag === "button" ? {
    disabled
  } : {
    ["data-disabled"]: disabled
  };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<svelte:element
	this={tag}
	class={generateClassNames(['ButtonField', className])}
	data-type={type}
	on:click
	on:dblclick
	on:mousedown
	on:mouseenter
	on:mouseleave
	on:mousemove
	on:mouseout
	on:mouseover
	on:mouseup
	on:contextmenu
	{...$$restProps}
	{...disabledAttributes}
>
	<slot/>
</svelte:element>

<style>:global(body) {
  --clue-button-field-border-color: transparent;
  --clue-button-field-border-color-hover: transparent;
  --clue-button-field-border-color-active: transparent;
  --clue-button-field-border-color-disabled: transparent;
  --clue-button-field-background-color: var(--clue-color-primary);
  --clue-button-field-background-color-hover: var(--clue-color-primary-600);
  --clue-button-field-background-color-active: var(--clue-color-primary-700);
  --clue-button-field-background-color-disabled: var(--clue-color-gray-50);
  --clue-button-field-color: var(--clue-color-white);
  --clue-button-field-color-hover: var(--clue-color-white);
  --clue-button-field-color-active: var(--clue-color-white);
  --clue-button-field-color-disabled: var(--clue-color-gray-300);
  --clue-button-field-t-action-border-color: transparent;
  --clue-button-field-t-action-border-color-hover: transparent;
  --clue-button-field-t-action-border-color-active: transparent;
  --clue-button-field-t-action-border-color-disabled: transparent;
  --clue-button-field-t-action-background-color: var(--clue-color-active);
  --clue-button-field-t-action-background-color-hover: var(--clue-color-active-600);
  --clue-button-field-t-action-background-color-active: var(--clue-color-active-700);
  --clue-button-field-t-action-background-color-disabled: var(--clue-button-field-background-color-disabled);
  --clue-button-field-t-action-color: var(--clue-color-gray-900);
  --clue-button-field-t-action-color-hover: var(--clue-color-gray-900);
  --clue-button-field-t-action-color-active: var(--clue-color-gray-900);
  --clue-button-field-t-action-color-disabled: var(--clue-button-field-color-disabled);
  --clue-button-field-t-secondary-border-color: transparent;
  --clue-button-field-t-secondary-border-color-hover: transparent;
  --clue-button-field-t-secondary-border-color-active: transparent;
  --clue-button-field-t-secondary-border-color-disabled: transparent;
  --clue-button-field-t-secondary-background-color: var(--clue-color-primary-50);
  --clue-button-field-t-secondary-background-color-hover: var(--clue-color-primary-100);
  --clue-button-field-t-secondary-background-color-active: var(--clue-color-primary-200);
  --clue-button-field-t-secondary-background-color-disabled: var(--clue-button-field-background-color-disabled);
  --clue-button-field-t-secondary-color: var(--clue-color-primary);
  --clue-button-field-t-secondary-color-hover: var(--clue-color-primary);
  --clue-button-field-t-secondary-color-active: var(--clue-color-primary);
  --clue-button-field-t-secondary-color-disabled: var(--clue-button-field-color-disabled);
  --clue-button-field-t-ghost-border-color: transparent;
  --clue-button-field-t-ghost-border-color-hover: transparent;
  --clue-button-field-t-ghost-border-color-active: transparent;
  --clue-button-field-t-ghost-border-color-disabled: transparent;
  --clue-button-field-t-ghost-background-color: transparent;
  --clue-button-field-t-ghost-background-color-hover: var(--clue-color-primary-50);
  --clue-button-field-t-ghost-background-color-active: var(--clue-color-primary-100);
  --clue-button-field-t-ghost-background-color-disabled: transparent;
  --clue-button-field-t-ghost-color: var(--clue-color-primary);
  --clue-button-field-t-ghost-color-hover: var(--clue-color-primary);
  --clue-button-field-t-ghost-color-active: var(--clue-color-primary);
  --clue-button-field-t-ghost-color-disabled: var(--clue-button-field-color-disabled);
  --clue-button-field-t-outlined-border-color: var(--clue-color-primary-100);
  --clue-button-field-t-outlined-border-color-hover: var(--clue-color-primary-100);
  --clue-button-field-t-outlined-border-color-active: var(--clue-color-primary-100);
  --clue-button-field-t-outlined-border-color-disabled: transparent;
  --clue-button-field-t-outlined-background-color: transparent;
  --clue-button-field-t-outlined-background-color-hover: var(--clue-color-primary-50);
  --clue-button-field-t-outlined-background-color-active: var(--clue-color-primary-100);
  --clue-button-field-t-outlined-background-color-disabled: transparent;
  --clue-button-field-t-outlined-color: var(--clue-color-primary);
  --clue-button-field-t-outlined-color-hover: var(--clue-color-primary);
  --clue-button-field-t-outlined-color-active: var(--clue-color-primary);
  --clue-button-field-t-outlined-color-disabled: var(--clue-button-field-color-disabled);
}

.ClueButtonField {
  --border-color: var(--clue-button-field-border-color);
  --border-color-hover: var(--clue-button-field-border-color-hover);
  --border-color-active: var(--clue-button-field-border-color-active);
  --border-color-disabled: var(--clue-button-field-border-color-disabled);
  --background-color: var(--clue-button-field-background-color);
  --background-color-hover: var(--clue-button-field-background-color-hover);
  --background-color-active: var(--clue-button-field-background-color-active);
  --background-color-disabled: var(--clue-button-field-background-color-disabled);
  --color: var(--clue-button-field-color);
  --color-hover: var(--clue-button-field-color-hover);
  --color-active: var(--clue-button-field-color-active);
  --color-disabled: var(--clue-button-field-color-disabled);
  outline: none;
  -webkit-appearance: none;
          appearance: none;
  border: 1px solid var(--border-color);
  border-radius: var(--clue-button-field-border-radius, 50px);
  padding: var(--clue-button-field-padding-y, 0) var(--clue-button-field-padding-x, 0);
  background-color: var(--background-color);
  color: var(--color);
  transition: var(--clue-transition);
  transition-property: color, background, width, height, padding, border, box-shadow;
}

button.ClueButtonField, a.ClueButtonField {
  cursor: pointer;
}

.ClueButtonField:not(.ClueButtonField[data-disabled=true], .ClueButtonField[disabled]):hover {
  background-color: var(--background-color-hover);
  color: var(--color-hover);
  border-color: var(--border-color-hover);
}

.ClueButtonField:not(.ClueButtonField[data-disabled=true], .ClueButtonField[disabled]):active {
  background-color: var(--background-color-active);
  color: var(--color-active);
  border-color: var(--border-color-active);
}

.ClueButtonField[disabled], .ClueButtonField[data-disabled=true] {
  cursor: not-allowed;
  background-color: var(--background-color-disabled);
  color: var(--color-disabled);
  border-color: var(--border-color-disabled);
}

.ClueButtonField[data-type=action] {
  --border-color: var(--clue-button-field-t-action-border-color);
  --border-color-hover: var(--clue-button-field-t-action-border-color-hover);
  --border-color-active: var(--clue-button-field-t-action-border-color-active);
  --border-color-disabled: var(--clue-button-field-t-action-border-color-disabled);
  --background-color: var(--clue-button-field-t-action-background-color);
  --background-color-hover: var(--clue-button-field-t-action-background-color-hover);
  --background-color-active: var(--clue-button-field-t-action-background-color-active);
  --background-color-disabled: var(--clue-button-field-t-action-background-color-disabled);
  --color: var(--clue-button-field-t-action-color);
  --color-hover: var(--clue-button-field-t-action-color-hover);
  --color-active: var(--clue-button-field-t-action-color-active);
  --color-disabled: var(--clue-button-field-t-action-color-disabled);
}

.ClueButtonField[data-type=secondary] {
  --border-color: var(--clue-button-field-t-secondary-border-color);
  --border-color-hover: var(--clue-button-field-t-secondary-border-color-hover);
  --border-color-active: var(--clue-button-field-t-secondary-border-color-active);
  --border-color-disabled: var(--clue-button-field-t-secondary-border-color-disabled);
  --background-color: var(--clue-button-field-t-secondary-background-color);
  --background-color-hover: var(--clue-button-field-t-secondary-background-color-hover);
  --background-color-active: var(--clue-button-field-t-secondary-background-color-active);
  --background-color-disabled: var(--clue-button-field-t-secondary-background-color-disabled);
  --color: var(--clue-button-field-t-secondary-color);
  --color-hover: var(--clue-button-field-t-secondary-color-hover);
  --color-active: var(--clue-button-field-t-secondary-color-active);
  --color-disabled: var(--clue-button-field-t-secondary-color-disabled);
}

.ClueButtonField[data-type=ghost] {
  --border-color: var(--clue-button-field-t-ghost-border-color);
  --border-color-hover: var(--clue-button-field-t-ghost-border-color-hover);
  --border-color-active: var(--clue-button-field-t-ghost-border-color-active);
  --border-color-disabled: var(--clue-button-field-t-ghost-border-color-disabled);
  --background-color: var(--clue-button-field-t-ghost-background-color);
  --background-color-hover: var(--clue-button-field-t-ghost-background-color-hover);
  --background-color-active: var(--clue-button-field-t-ghost-background-color-active);
  --background-color-disabled: var(--clue-button-field-t-ghost-background-color-disabled);
  --color: var(--clue-button-field-t-ghost-color);
  --color-hover: var(--clue-button-field-t-ghost-color-hover);
  --color-active: var(--clue-button-field-t-ghost-color-active);
  --color-disabled: var(--clue-button-field-t-ghost-color-disabled);
}

.ClueButtonField[data-type=outlined] {
  --border-color: var(--clue-button-field-t-outlined-border-color);
  --border-color-hover: var(--clue-button-field-t-outlined-border-color-hover);
  --border-color-active: var(--clue-button-field-t-outlined-border-color-active);
  --border-color-disabled: var(--clue-button-field-t-outlined-border-color-disabled);
  --background-color: var(--clue-button-field-t-outlined-background-color);
  --background-color-hover: var(--clue-button-field-t-outlined-background-color-hover);
  --background-color-active: var(--clue-button-field-t-outlined-background-color-active);
  --background-color-disabled: var(--clue-button-field-t-outlined-background-color-disabled);
  --color: var(--clue-button-field-t-outlined-color);
  --color-hover: var(--clue-button-field-t-outlined-color-hover);
  --color-active: var(--clue-button-field-t-outlined-color-active);
  --color-disabled: var(--clue-button-field-t-outlined-color-disabled);
}</style>
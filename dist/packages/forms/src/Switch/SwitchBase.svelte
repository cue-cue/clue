<script>import { generateClassNames, randomId } from "@clue/utils";
import InputCheckbox from "../Input/InputCheckbox.svelte";
import CheckboxField from "../Checkbox/CheckboxField.svelte";
let className = "";
export { className as class };
export let checked = void 0;
export let disabled = void 0;
export let id = randomId("checkbox");
export let group = [];
export let value = "";
</script>

<CheckboxField {id} class={generateClassNames(['SwitchBase', className])}>
	<InputCheckbox bind:group bind:value {id} bind:checked {disabled} {...$$restProps}/>
</CheckboxField>

<style>:global(body) {
  --clue-switch-base-width: 42px;
  --clue-switch-base-height: 24px;
  --clue-switch-checked-background-color-disabled: var(--clue-checkbox-field-background-color-disabled);
  --clue-switch-checked-border-color-disabled: transparent;
  --clue-switch-thumb-width: 16px;
  --clue-switch-thumb-height: 16px;
  --clue-switch-thumb-border-radius: 50%;
  --clue-switch-thumb-background-color: var(--clue-checkbox-field-thumb-background-color);
  --clue-switch-thumb-background-color-hover: var(--clue-checkbox-field-thumb-background-color-hover);
  --clue-switch-thumb-background-color-disabled: var(--clue-checkbox-field-thumb-background-color-disabled);
  --clue-switch-thumb-checked-background-color: var(--clue-checkbox-field-checked-thumb-background-color);
  --clue-switch-thumb-checked-background-color-disabled: var(--clue-checkbox-field-checked-thumb-background-color-disabled);
}

:global(.ClueSwitchBase) {
  --clue-checkbox-field-width: var(--clue-switch-base-width);
  --clue-checkbox-field-height: var(--clue-switch-base-height);
  --clue-checkbox-field-checked-background-color-disabled: var(--clue-switch-checked-background-color-disabled);
  --clue-checkbox-field-border-radius: var(--clue-switch-base-height);
  --clue-checkbox-field-border-color-disabled: var(--clue-switch-checked-border-color-disabled);
  --thumb-space: calc((var(--clue-switch-base-height) - var(--clue-switch-thumb-height)) / 2 - var(--clue-checkbox-field-border-width));
}

:global(.ClueSwitchBase) :global(input:disabled ~ .ClueCheckboxField__label)::after {
  background-color: var(--clue-switch-thumb-background-color-disabled);
}

:global(.ClueSwitchBase) :global(input:disabled:checked ~ .ClueCheckboxField__label)::after {
  background-color: var(--clue-switch-thumb-checked-background-color-disabled);
}

:global([data-clue-checkbox-field-hover-trigger]):hover :global(.ClueSwitchBase) :global(input:not(:disabled):not(:checked) ~ .ClueCheckboxField__label)::after, :global(.ClueSwitchBase) :global(input:not(:disabled):not(:checked) ~ .ClueCheckboxField__label):hover::after {
  background-color: var(--clue-switch-thumb-background-color-hover);
}

:global(.ClueSwitchBase) :global(input:checked ~ .ClueCheckboxField__label)::after {
  left: calc(100% - var(--clue-switch-thumb-height) - var(--thumb-space));
  background-color: var(--clue-switch-thumb-checked-background-color);
}

:global(.ClueSwitchBase) :global(.ClueCheckboxField__label)::after {
  content: "";
  position: absolute;
  top: 50%;
  left: var(--thumb-space);
  transform: translateY(-50%);
  width: var(--clue-switch-thumb-width);
  height: var(--clue-switch-thumb-height);
  border-radius: var(--clue-switch-thumb-border-radius);
  background-color: var(--clue-switch-thumb-background-color);
  transition: var(--clue-transition);
  transition-property: background, left;
}</style>
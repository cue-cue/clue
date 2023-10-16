<script>import { generateClassNames, randomId } from "@clue/utils";
import InputRadio from "../Input/InputRadio.svelte";
import CheckboxField from "../Checkbox/CheckboxField.svelte";
let className = "";
export { className as class };
export let disabled = void 0;
export let id = randomId("checkbox");
export let group = void 0;
export let value = void 0;
</script>

<CheckboxField {id} class={generateClassNames(['RadioBase', className])}>
	<InputRadio bind:group {value} {id} {disabled} {...$$restProps}/>
</CheckboxField>

<style>:global(body) {
  --clue-radio-base-border-radius: 50%;
  --clue-radio-base-checked-background-color-disabled: var(--clue-checkbox-field-background-color-disabled);
  --clue-radio-base-thumb-background-color: var(--clue-checkbox-field-checked-thumb-background-color);
  --clue-radio-base-checked-thumb-background-color-disabled: var(--clue-checkbox-field-checked-thumb-background-color-disabled);
}

:global(.ClueRadioBase) {
  --clue-checkbox-field-border-radius: var(--clue-radio-base-border-radius);
  --clue-checkbox-field-checked-background-color-disabled: var(--clue-radio-base-checked-background-color-disabled);
}

:global(.ClueRadioBase) :global(input:checked:disabled ~ .ClueCheckboxField__label)::after {
  background: var(--clue-radio-base-checked-thumb-background-color-disabled);
}

:global(.ClueRadioBase) :global(input:checked ~ .ClueCheckboxField__label)::after {
  opacity: 1;
}

:global(.ClueRadioBase) :global(.ClueCheckboxField__label)::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background: var(--clue-radio-base-thumb-background-color);
  border-radius: 50%;
  opacity: 0;
  transition: var(--clue-transition);
  transition-property: background, opacity;
}</style>
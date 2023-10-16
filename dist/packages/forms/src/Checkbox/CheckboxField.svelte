<script>import { generateClassNames, randomId } from "@cluue/utils";
import { fieldContext } from "../FieldContext/index.js";
let className = "";
export { className as class };
export let id = void 0;
export let manual = void 0;
const fieldContextStore = fieldContext.get();
const handler = {
  click(e) {
    if ($fieldContextStore.manual || manual)
      e.preventDefault();
  }
};
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<label for={id} on:click={handler.click} class={generateClassNames(['CheckboxField', className])}>
	<slot/>
	<span class={generateClassNames(['CheckboxField__label'])}></span>
</label>

<style>:global(body) {
  --clue-checkbox-field-width: 20px;
  --clue-checkbox-field-height: 20px;
  --clue-checkbox-field-border-radius: 5px;
  --clue-checkbox-field-border-width: 2px;
  --clue-checkbox-field-border-color: var(--clue-color-gray-200);
  --clue-checkbox-field-border-color-hover: var(--clue-color-primary);
  --clue-checkbox-field-border-color-disabled: var(--clue-color-gray-100);
  --clue-checkbox-field-checked-border-color: transparent;
  --clue-checkbox-field-checked-border-color-hover: transparent;
  --clue-checkbox-field-checked-border-color-disabled: transparent;
  --clue-checkbox-field-background-color: var(--clue-color-white);
  --clue-checkbox-field-background-color-hover: var(--clue-color-white);
  --clue-checkbox-field-background-color-disabled: #f4f4f6;
  --clue-checkbox-field-checked-background-color: var(--clue-color-primary-400);
  --clue-checkbox-field-checked-background-color-hover: var(--clue-color-primary);
  --clue-checkbox-field-checked-background-color-disabled: var(--clue-color-primary-200);
  --clue-checkbox-field-thumb-background-color: var(--clue-color-primary-400);
  --clue-checkbox-field-thumb-background-color-hover: var(--clue-color-primary);
  --clue-checkbox-field-thumb-background-color-disabled: var(--clue-color-gray-200);
  --clue-checkbox-field-checked-thumb-background-color: var(--clue-color-white);
  --clue-checkbox-field-checked-thumb-background-color-disabled: var(--clue-color-gray-200);
}

.ClueCheckboxField {
  --border-radius: var(--clue-checkbox-field-border-radius);
  width: var(--clue-checkbox-field-width);
  height: var(--clue-checkbox-field-height);
  flex: none;
}

.ClueCheckboxField__label {
  display: inline-block;
  width: 100%;
  height: 100%;
  flex: none;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  background-color: var(--clue-checkbox-field-background-color);
  border-radius: var(--border-radius);
  border: var(--clue-checkbox-field-border-width) solid var(--clue-checkbox-field-border-color);
  transition: var(--clue-transition);
  transition-property: border, background, border-radius, width, height;
}

.ClueCheckboxField :global(input) {
  display: none;
}

:global([data-clue-checkbox-field-hover-trigger]):hover .ClueCheckboxField :global(input:not(:checked):not(:disabled) ~ .ClueCheckboxField__label), .ClueCheckboxField :global(input:not(:checked):not(:disabled) ~ .ClueCheckboxField__label):hover {
  border-color: var(--clue-checkbox-field-border-color-hover);
  background-color: var(--clue-checkbox-field-background-color-hover);
}

.ClueCheckboxField :global(input:disabled ~ .ClueCheckboxField__label) {
  cursor: not-allowed;
  border-color: var(--clue-checkbox-field-border-color-disabled);
  background-color: var(--clue-checkbox-field-background-color-disabled);
}

.ClueCheckboxField :global(input:disabled:checked ~ .ClueCheckboxField__label) {
  background-color: var(--clue-checkbox-field-checked-background-color-disabled);
  border-color: var(--clue-checkbox-field-checked-border-color-disabled);
}

.ClueCheckboxField :global(input:not(:disabled):checked ~ .ClueCheckboxField__label) {
  background-color: var(--clue-checkbox-field-checked-background-color);
  border-color: var(--clue-checkbox-field-checked-border-color);
}

:global([data-clue-checkbox-field-hover-trigger]):hover .ClueCheckboxField :global(input:not(:disabled):checked ~ .ClueCheckboxField__label), .ClueCheckboxField :global(input:not(:disabled):checked ~ .ClueCheckboxField__label):hover {
  border-color: var(--clue-checkbox-field-checked-border-color-hover);
  background-color: var(--clue-checkbox-field-checked-background-color-hover);
}</style>
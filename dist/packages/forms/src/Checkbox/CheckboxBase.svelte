<script>import InputCheckbox from "../Input/InputCheckbox.svelte";
import { generateClassNames, randomId } from "@cluue/utils";
import CheckboxField from "./CheckboxField.svelte";
import { fieldContext } from "../FieldContext/index.js";
let className = "";
export { className as class };
export let checked = void 0;
export let disabled = void 0;
export let id = randomId("checkbox");
export let group = [];
export let value = "";
export let manual = void 0;
const fieldContextStore = fieldContext.get();
$:
  _manual = $fieldContextStore.manual || manual;
</script>

<CheckboxField manual={_manual} {id} class={generateClassNames(['CheckboxBase', className])}>
	<InputCheckbox manual={_manual} bind:group bind:value {id} bind:checked {disabled} {...$$restProps}/>
</CheckboxField>

<style>:global(body) {
  --clue-checkbox-base-icon: url("data:image/svg+xml,%3Csvg width='12' height='10' viewBox='0 0 12 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.2588 0.991227C11.4931 1.22564 11.6248 1.54352 11.6248 1.87498C11.6248 2.20643 11.4931 2.52432 11.2588 2.75873L5.00877 9.00873C4.77436 9.24307 4.45648 9.37471 4.12502 9.37471C3.79357 9.37471 3.47568 9.24307 3.24127 9.00873L0.741271 6.50873C0.513573 6.27297 0.38758 5.95722 0.390428 5.62948C0.393276 5.30173 0.524737 4.98821 0.756497 4.75645C0.988258 4.52469 1.30177 4.39323 1.62952 4.39038C1.95726 4.38754 2.27302 4.51353 2.50877 4.74123L4.12502 6.35748L9.49127 0.991227C9.72568 0.756889 10.0436 0.625244 10.375 0.625244C10.7065 0.625244 11.0244 0.756889 11.2588 0.991227Z' fill='white'/%3E%3C/svg%3E%0A");
}

:global(.ClueCheckboxBase) :global(input:not(:checked):disabled ~ .ClueCheckboxField__label)::after {
  opacity: 0;
}

:global(.ClueCheckboxBase) :global(.ClueCheckboxField__label)::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-image: var(--clue-checkbox-base-icon);
  background-repeat: no-repeat;
  background-size: 12px 10px;
  background-position: center center;
  transition: var(--clue-transition);
  transition-property: opacity;
}</style>
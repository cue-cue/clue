<script>import { generateClassNames } from "@clue/utils";
import Input from "../Input/Input.svelte";
import { context, textFieldBaseContext } from "./context.js";
import { writable } from "svelte/store";
import TextFieldButtons from "./TextFieldButtons.svelte";
import { actionList } from "../../../utils/src/actions/actionList.js";
let className = "";
export { className as class };
export let error = void 0;
export let disabled = void 0;
export let value = "";
export let type = "text";
export let focused = void 0;
export let use = void 0;
export let nodeElement = void 0;
export let size = void 0;
export let slots = void 0;
const localContext = context.get() || writable({});
export const inputController = {
  clear: void 0,
  update: void 0,
  set: void 0
};
const textFieldBaseContextStore = textFieldBaseContext.set(writable({ size }));
$:
  textFieldBaseContextStore.set({ size });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class={generateClassNames(['TextFieldBase', className])}
	data-error={$localContext?.error || error}
	data-disabled={$localContext?.disabled || disabled}
	data-multiline={$$restProps.multiline}
	data-readonly={$$restProps.readonly}
	data-focused={focused}
	data-size={size}
	bind:this={nodeElement}
	use:actionList={use}
	on:click
	on:dblclick
>
	{#if $$slots['buttons-start'] && (slots?.['buttons-start'] ?? true)}
		<TextFieldButtons class={generateClassNames(['TextFieldBase__buttons', 'TextFieldBase__buttons_start'])}><slot name='buttons-start'/></TextFieldButtons>
	{/if}
	<slot>
		<Input
			disabled={$localContext?.disabled || disabled}
			id={$localContext?.id}
			{type}
			on:focus
			on:blur
			bind:value
			bind:clear={inputController.clear}
			bind:update={inputController.update}
			bind:set={inputController.set}
			{...$$restProps}
		/>
	</slot>
	<span class={generateClassNames(['TextFieldBase__border'])}></span>
	{#if $$slots.buttons && (slots?.buttons ?? true)}
		<TextFieldButtons class={generateClassNames(['TextFieldBase__buttons', 'TextFieldBase__buttons_end'])}><slot name='buttons'/></TextFieldButtons>
	{/if}
</div>

<style>:global(body) {
  --clue-text-field-base-height: 48px;
  --clue-text-field-base-s-small-height: 32px;
  --clue-text-field-base-padding-y: 12px;
  --clue-text-field-base-padding-x: 16px;
  --clue-text-field-base-s-small-padding-y: 10px;
  --clue-text-field-base-s-small-padding-x: 14px;
  --clue-text-field-base-border-color: #E8E9ED;
  --clue-text-field-base-border-color-hover: var(--clue-color-txt-placeholder);
  --clue-text-field-base-border-color-focus: var(--clue-color-primary-300);
  --clue-text-field-base-border-color-error: var(--clue-color-negative-500);
  --clue-text-field-base-border-color-disabled: var(--clue-color-border-disabled);
  --clue-text-field-base-background-color: var(--clue-color-white);
  --clue-text-field-base-background-color-disabled: var(--clue-color-bg-secondary);
  --clue-text-field-base-background-color-readonly: var(--clue-color-bg-secondary);
  --clue-text-field-base-textarea-background-color: var(--clue-color-bg-secondary);
  --clue-text-field-base-border-width: 1px;
  --clue-text-field-base-border-width-focus: 2px;
  --clue-text-field-base-border-width-error: 2px;
  --clue-text-field-base-border-width-disabled: 1px;
  --clue-text-field-base-border-width-readonly: 0;
  --clue-text-field-base-textarea-border-width: 0;
  --clue-text-field-base-textarea-border-width-focus: 0;
  --clue-text-field-base-textarea-border-width-error: 0;
  --clue-text-field-base-textarea-border-width-disabled: 0;
  --clue-text-field-base-border-radius: var(--clue-size-border-radius-3);
  --clue-text-field-base-s-small-border-radius: var(--clue-size-border-radius-2);
  --clue-text-field-base-font-size: 16px;
  --clue-text-field-base-s-small-font-size: 14px;
  --clue-text-field-base-font-weight: 400;
  --clue-text-field-base-color: #000000;
  --clue-text-field-base-color-hover: #484B5B;
  --clue-text-field-base-color-focus: #000000;
  --clue-text-field-base-color-disabled: var(--clue-color-txt-placeholder);
  --clue-text-field-base-placeholder-color: var(--clue-color-gray-300);
  --clue-text-field-base-placeholder-color-hover: #484B5B;
  --clue-text-field-base-placeholder-color-focus: #484B5B;
  --clue-text-field-base-placeholder-color-disabled: var(--clue-color-txt-placeholder);
}

.ClueTextFieldBase {
  --box-shadow-color: var(--clue-text-field-base-border-color);
  --box-shadow-size: var(--clue-text-field-base-border-width);
  --background-color: var(--clue-text-field-base-background-color);
  --border-radius: var(--clue-text-field-base-border-radius);
  --padding-y: var(--clue-text-field-base-padding-y);
  --padding-x: var(--clue-text-field-base-padding-x);
  display: flex;
  position: relative;
  width: auto;
  min-height: var(--clue-text-field-base-height);
  font-weight: var(--clue-text-field-base-font-weight);
  font-size: var(--clue-text-field-base-font-size);
  color: var(--clue-text-field-base-color);
  background-color: var(--background-color);
  border-radius: var(--border-radius);
  transition: var(--clue-transition);
  transition-property: background, border-radius;
}

.ClueTextFieldBase[data-size=small] {
  min-height: var(--clue-text-field-base-s-small-height);
  --border-radius: var(--clue-text-field-base-s-small-border-radius);
  --padding-y: var(--clue-text-field-base-s-small-padding-y);
  --padding-x: var(--clue-text-field-base-s-small-padding-x);
  font-size: var(--clue-text-field-base-s-small-font-size);
}

.ClueTextFieldBase:not(.ClueTextFieldBase[data-disabled=true], .ClueTextFieldBase[data-readonly=true], .ClueTextFieldBase[data-error=true]):hover {
  --box-shadow-color: var(--clue-text-field-base-border-color-hover);
}

.ClueTextFieldBase:not(.ClueTextFieldBase[data-disabled=true], .ClueTextFieldBase[data-readonly=true], .ClueTextFieldBase[data-error=true])[data-multiline=true] {
  --box-shadow-size: var(--clue-text-field-base-textarea-border-width);
}

.ClueTextFieldBase[data-multiline=true] {
  --background-color: var(--clue-text-field-base-textarea-background-color);
}

.ClueTextFieldBase[data-multiline=true] :global(.ClueTextFieldBase__buttons) {
  align-self: start;
  margin-top: calc(var(--padding-y) - 2px);
}

.ClueTextFieldBase[data-readonly=true] {
  --background-color: var(--clue-text-field-base-background-color-readonly);
  --box-shadow-size: var(--clue-text-field-base-border-width-readonly);
}

.ClueTextFieldBase[data-error=true] {
  --box-shadow-color: var(--clue-text-field-base-border-color-error);
  --box-shadow-size: var(--clue-text-field-base-border-width-error);
}

.ClueTextFieldBase[data-disabled=true]:not(.ClueTextFieldBase[data-disabled=true][data-error=true]) {
  --box-shadow-size: var(--clue-text-field-base-border-width-disabled);
  --box-shadow-color: var(--clue-text-field-base-border-color-disabled);
}

.ClueTextFieldBase[data-disabled=true] :global(.ClueInput), .ClueTextFieldBase[data-disabled=true] :global(.ClueTextFieldValue) {
  color: var(--clue-text-field-base-placeholder-color-disabled);
  --placeholder-color: var(--clue-text-field-base-placeholder-color-disabled);
}

.ClueTextFieldBase__border {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
  box-shadow: inset 0 0 0 var(--box-shadow-size) var(--box-shadow-color);
  pointer-events: none;
  transition: var(--clue-transition);
  transition-property: box-shadow, border-radius;
}

.ClueTextFieldBase:not(.ClueTextFieldBase[data-disabled=true])[data-focused=true] {
  --box-shadow-color: var(--clue-text-field-base-border-color-focus);
  --box-shadow-size: var(--clue-text-field-base-border-width-focus);
}

.ClueTextFieldBase:not(.ClueTextFieldBase[data-disabled=true]) :global(.ClueInput:focus ~ .ClueTextFieldBase__border) {
  --box-shadow-color: var(--clue-text-field-base-border-color-focus);
  --box-shadow-size: var(--clue-text-field-base-border-width-focus);
}

.ClueTextFieldBase :global(.ClueInput), .ClueTextFieldBase :global(.ClueTextFieldValue) {
  --placeholder-color: var(--clue-text-field-base-placeholder-color);
  display: flex;
  align-items: center;
  border-radius: var(--border-radius);
  padding: var(--padding-y) var(--padding-x);
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
  min-height: 100%;
  flex: 1;
  width: 100%;
  resize: none;
  transition: var(--clue-transition);
  transition-property: color, border-radius;
}

.ClueTextFieldBase :global(.ClueInput)::placeholder, .ClueTextFieldBase :global(.ClueTextFieldValue)::placeholder {
  transition: var(--clue-transition);
  transition-property: color;
  color: var(--placeholder-color);
}

.ClueTextFieldBase :global(.ClueInput[type="password"]) {
  letter-spacing: 0.18em;
}

.ClueTextFieldBase:not(.ClueTextFieldBase[data-disabled=true], .ClueTextFieldBase[data-readonly=true]) :global(.ClueInput):hover, .ClueTextFieldBase:not(.ClueTextFieldBase[data-disabled=true], .ClueTextFieldBase[data-readonly=true]) :global(.ClueTextFieldValue):hover {
  --placeholder-color: var(--clue-text-field-base-placeholder-color-hover);
}

.ClueTextFieldBase:not(.ClueTextFieldBase[data-disabled=true], .ClueTextFieldBase[data-readonly=true]) :global(.ClueInput):focus, .ClueTextFieldBase:not(.ClueTextFieldBase[data-disabled=true], .ClueTextFieldBase[data-readonly=true]) :global(.ClueTextFieldValue):focus {
  --placeholder-color: var(--clue-text-field-base-placeholder-color-focus);
}

:global(.ClueTextFieldBase__buttons) {
  flex: none;
  align-self: center;
}

:global(.ClueTextFieldBase__buttons_start) {
  margin-left: var(--padding-x);
}

:global(.ClueTextFieldBase__buttons_start[data-hidden="true"]) {
  margin-left: 0;
}

:global(.ClueTextFieldBase__buttons_end) {
  margin-right: var(--padding-x);
}

:global(.ClueTextFieldBase__buttons_end[data-hidden="true"]) {
  margin-right: 0;
}</style>
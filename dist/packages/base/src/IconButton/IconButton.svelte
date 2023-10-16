<script>import { generateClassNames } from "@cluue/utils";
import ButtonField from "../Button/ButtonField.svelte";
import { Icon } from "@cluue/icons";
let className = "";
export { className as class };
export let href = void 0;
export let size = "medium";
export let icon;
</script>

<ButtonField
	tag={href ? 'a' : 'button'}
	class={generateClassNames(['IconButton', className])}
	data-size={size}
	{href}
	{...$$restProps}
>
	<Icon {icon}/>
</ButtonField>

<style>:global(body) {
  --clue-icon-button-size: 48px;
  --clue-icon-button-size-small: 40px;
  --clue-icon-button-size-large: 56px;
  --clue-icon-button-icon-size: 24px;
  --clue-icon-button-icon-size-small: 20px;
  --clue-icon-button-icon-size-large: 24px;
  --clue-icon-button-background-color-disabled-primary: var(--clue-color-primary-100);
  --clue-icon-button-color-disabled-primary: var(--clue-color-primary-300);
}

:global(.ClueIconButton) {
  --size: var(--clue-icon-button-size);
  --icon-size: var(--clue-icon-button-icon-size);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: var(--size);
  height: var(--size);
}

:global(.ClueIconButton) :global(.ClueIcon) {
  --clue-icon-color: currentColor;
  width: var(--icon-size);
  height: var(--icon-size);
}

:global(.ClueIconButton[data-size="large"]) {
  --size: var(--clue-icon-button-size-large);
  --icon-size: var(--clue-icon-button-icon-size-large);
}

:global(.ClueIconButton[data-size="small"]) {
  --size: var(--clue-icon-button-size-small);
  --icon-size: var(--clue-icon-button-icon-size-small);
}

:global(.ClueIconButton[data-color="primary"]) {
  --clue-button-field-background-color-disabled: var(--clue-icon-button-background-color-disabled-primary);
  --clue-button-field-color-disabled: var(--clue-icon-button-color-disabled-primary);
}</style>
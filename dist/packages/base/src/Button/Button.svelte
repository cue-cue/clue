<script>import { generateClassNames } from "@clue/utils";
import ButtonField from "./ButtonField.svelte";
import ButtonIcon from "./ButtonIcon.svelte";
let className = "";
export { className as class };
export let href = void 0;
export let startIcon = void 0;
export let endIcon = void 0;
export let size = void 0;
</script>

<ButtonField
    class={generateClassNames(['Button', className])}
    tag={href ? 'a' : 'button'}
    {href}
    data-size={size}
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
>
    {#if startIcon}
        <ButtonIcon icon={startIcon} class={generateClassNames(['Button__icon_start'])}/>
    {/if}
    <span><slot/></span>
    {#if endIcon}
        <ButtonIcon icon={endIcon} class={generateClassNames(['Button__icon_end'])}/>
    {/if}
</ButtonField>

<style>:global(body) {
  --clue-button-padding-x: 16px;
  --clue-button-padding-y: 12px;
  --clue-button-border-radius: 56px;
  --clue-button-font-size: 16px;
  --clue-button-font-weight: 500;
  --clue-button-gap: 12px;
  --clue-button-icon-size: 24px;
  --clue-button-s-small-padding-x: var(--clue-button-padding-x);
  --clue-button-s-small-padding-y: 10px;
  --clue-button-s-small-border-radius: var(--clue-button-border-radius);
  --clue-button-s-small-font-size: 14px;
  --clue-button-s-small-gap: var(--clue-button-gap);
  --clue-button-s-small-icon-size: 20px;
  --clue-button-s-large-padding-x: 24px;
  --clue-button-s-large-padding-y: 16px;
  --clue-button-s-large-border-radius: var(--clue-button-border-radius);
  --clue-button-s-large-font-size: var(--clue-button-font-size);
  --clue-button-s-large-gap: var(--clue-button-gap);
  --clue-button-s-large-icon-size: var(--clue-button-icon-size);
}

:global(.ClueButton) {
  --clue-button-field-padding-x: var(--clue-button-padding-x);
  --clue-button-field-padding-y: var(--clue-button-padding-y);
  --clue-button-field-border-radius: var(--clue-button-border-radius);
  display: inline-flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  line-height: var(--clue-button-icon-size);
  font-weight: var(--clue-button-font-weight);
  font-size: var(--clue-button-font-size);
}

:global(.ClueButton) :global(.ClueButtonIcon) {
  flex: none;
  width: var(--clue-button-icon-size);
  height: var(--clue-button-icon-size);
}

:global(.ClueButton[data-size="small"]) {
  --clue-button-padding-x: var(--clue-button-s-small-padding-x);
  --clue-button-padding-y: var(--clue-button-s-small-padding-y);
  --clue-button-border-radius: var(--clue-button-s-small-border-radius);
  --clue-button-font-size: var(--clue-button-s-small-font-size);
  --clue-button-gap: var(--clue-button-s-small-gap);
  --clue-button-icon-size: var(--clue-button-s-small-icon-size);
}

:global(.ClueButton[data-size="large"]) {
  --clue-button-padding-x: var(--clue-button-s-large-padding-x);
  --clue-button-padding-y: var(--clue-button-s-large-padding-y);
  --clue-button-border-radius: var(--clue-button-s-large-border-radius);
  --clue-button-font-size: var(--clue-button-s-large-font-size);
  --clue-button-gap: var(--clue-button-s-large-gap);
  --clue-button-icon-size: var(--clue-button-s-large-icon-size);
}

:global(.ClueButton__icon_start) {
  margin-right: var(--clue-button-gap);
}

:global(.ClueButton__icon_end) {
  margin-left: var(--clue-button-gap);
}</style>
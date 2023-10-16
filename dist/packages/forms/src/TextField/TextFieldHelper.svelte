<script>import { Icon } from "@cluue/icons";
import errorIcon from "@cluue/icons/filled/exclamation-circle.svg";
import { generateClassNames } from "@cluue/utils";
let className = "";
export { className as class };
export let error = false;
export let disabled = false;
</script>

<div class={generateClassNames(['TextFieldHelper', className])} data-disabled={disabled} data-error={error}>
    {#if error}
        <Icon width={16} icon={errorIcon}/>
    {/if}
    <span>
        <slot></slot>
    </span>
</div>

<style>.ClueTextFieldHelper {
  font-weight: 400;
  color: var(--clue-color-gray-700);
  font-size: 12px;
  line-height: 150%;
  transition: var(--clue-transition);
  transition-property: color;
  vertical-align: middle;
  display: flex;
}
.ClueTextFieldHelper[data-disabled=true] {
  color: var(--clue-color-txt-placeholder);
}
.ClueTextFieldHelper[data-error=true] {
  color: var(--clue-color-negative-500);
}
.ClueTextFieldHelper :global(.ClueIcon) {
  --clue-icon-color: currentColor;
  flex: none;
  margin-right: 4px;
  transition: none;
}</style>
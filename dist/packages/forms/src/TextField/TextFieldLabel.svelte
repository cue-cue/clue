<script>import { generateClassNames } from "@clue/utils";
import { context } from "./context.js";
let className = "";
export { className as class };
export let color = void 0;
</script>

<label {...$$restProps} class={generateClassNames(['TextFieldLabel', className])} data-color={color}>
    <slot/>
</label>

<style>.ClueTextFieldLabel {
  color: var(--clue-color-gray-700);
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  transition: var(--clue-transition);
  transition-property: color;
}
.ClueTextFieldLabel[data-color=disabled] {
  color: var(--clue-color-txt-placeholder);
}</style>
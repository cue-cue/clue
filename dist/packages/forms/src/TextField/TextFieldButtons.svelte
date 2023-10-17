<script>import { generateClassNames } from "@cluue/utils";
import { textFieldBaseContext, textFieldButtonsContext } from "./context.js";
import { writable } from "svelte/store";
import { onMount } from "svelte";
let className = "";
export { className as class };
export let autoHide = true;
export let size = void 0;
const textFieldBaseContextStore = textFieldBaseContext.get();
const textFieldButtonsContextStore = textFieldButtonsContext.set(writable({ count: 0, mounted: false }));
$:
  isHidden = autoHide && $textFieldButtonsContextStore.count <= 0 && $textFieldButtonsContextStore.mounted;
$:
  if (textFieldBaseContextStore) {
    size = $textFieldBaseContextStore.size;
  }
onMount(() => $textFieldButtonsContextStore.mounted = true);
</script>

<div class={generateClassNames(['TextFieldButtons', className])} data-hidden={isHidden} data-size={size}>
	<slot/>
</div>

<style>.ClueTextFieldButtons {
  --gap: 24px;
  display: flex;
  align-items: center;
  transition: calc(var(--clue-transition-duration) / 2);
  transition-timing-function: linear;
  transition-property: margin, opacity;
}
.ClueTextFieldButtons[data-size=small] {
  --gap: 20px;
}
.ClueTextFieldButtons :global(.ClueTextFieldButton) {
  position: relative;
}
.ClueTextFieldButtons :global(.ClueTextFieldButton):not(:last-child) {
  margin-right: var(--gap);
}
.ClueTextFieldButtons :global(.ClueTextFieldButton):not(:last-child)::after {
  opacity: 1;
}
.ClueTextFieldButtons :global(.ClueTextFieldButton)::after {
  content: "";
  opacity: 0;
  pointer-events: none;
  width: 1px;
  height: 66.6%;
  background: var(--clue-color-border);
  display: block;
  position: absolute;
  right: calc(var(--gap) / 2 * -1);
  top: 50%;
  transform: translateY(-50%);
  transition: var(--clue-transition);
  transition-property: opacity;
}</style>
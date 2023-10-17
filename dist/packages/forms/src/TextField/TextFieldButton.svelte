<script>import { generateClassNames } from "@cluue/utils";
import { Icon } from "@cluue/icons";
import { onMount, onDestroy } from "svelte";
import { config } from "@cluue/config";
import { textFieldBaseContext, textFieldButtonsContext } from "./context.js";
import { writable } from "svelte/store";
let className = "";
export { className as class };
export let icon;
export let width = void 0;
const transitionFunction = (node) => {
  const styles = getComputedStyle(node);
  const width2 = parseInt(styles.width);
  const marginRight = parseInt(styles["margin-right"] || "0");
  const marginLeft = parseInt(styles["margin-left"] || "0");
  const opacity = +styles.opacity;
  return {
    delay: $config.transition.delay || 0,
    duration: ($config.transition.duration || 200) / 2,
    css: (t) => {
      const eased = t;
      const res = `
					opacity: ${eased * opacity};
					width: ${eased * width2}px;
					margin-right: ${eased * marginRight}px;
					margin-left: ${eased * marginLeft}px;
				`;
      return res;
    }
  };
};
const iconSizeMap = /* @__PURE__ */ new Map([
  ["small", 20],
  ["medium", 24],
  [void 0, 24]
]);
const textFieldBaseContextStore = textFieldBaseContext.get() || writable({});
const textFieldButtonsContextStore = textFieldButtonsContext.get();
onMount(() => {
  if (textFieldButtonsContextStore) {
    $textFieldButtonsContextStore.count += 1;
  }
});
onDestroy(() => {
  if (textFieldButtonsContextStore) {
    $textFieldButtonsContextStore.count -= 1;
  }
});
</script>

<button on:click class={generateClassNames(['TextFieldButton', className])} transition:transitionFunction>
	<Icon {icon} width={width ?? iconSizeMap.get($textFieldBaseContextStore.size)} {...$$restProps}/>
</button>

<style>:global(body) {
  --clue-text-field-button-click-area-size: 24px;
}

.ClueTextFieldButton {
  padding: 0;
  margin: 0;
  position: relative;
  background: none;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--clue-transition);
  transition-timing-function: linear;
  transition-property: margin, transform;
}

.ClueTextFieldButton:hover :global(.ClueIcon) {
  --clue-icon-color: var(--clue-color-primary-500);
}

.ClueTextFieldButton::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: var(--clue-text-field-button-click-area-size);
  height: var(--clue-text-field-button-click-area-size);
}

.ClueTextFieldButton :global(.ClueIcon) {
  flex: none;
}</style>
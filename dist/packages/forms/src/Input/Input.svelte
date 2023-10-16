<script>import { generateClassNames } from "@clue/utils";
import InputTextareaElement from "./InputTextareaElement.svelte";
import InputElement from "./InputElement.svelte";
let className = "";
export { className as class };
export let value = "";
export let multiline = false;
export let nodeElement = void 0;
const elementsMap = /* @__PURE__ */ new Map([
  [false, InputElement],
  [true, InputTextareaElement]
]);
export const set = (newValue) => {
  value = newValue;
};
export const update = (callback) => {
  set(callback(value));
};
export const clear = () => {
  value = "";
};
</script>

<svelte:component
    this={elementsMap.get(multiline)}
    bind:nodeElement
    class={generateClassNames(['Input', className])}
    on:input
    on:change
    on:keydown
    on:keyup
    on:click
    on:focus
    on:blur
    bind:value
    {...$$restProps}
/>

<style>:global(.ClueInput) {
  border: none;
  outline: none;
  -webkit-appearance: none;
          appearance: none;
  background: none;
  padding: 0;
  margin: 0;
}</style>
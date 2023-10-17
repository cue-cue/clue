<script>import IconUse from "./IconUse.svelte";
import { generateClassNames } from "@cluue/utils";
let className = "";
export { className as class };
export let icon;
export let width = void 0;
export let height = void 0;
export let color = void 0;
export let size = void 0;
export let reverse = void 0;
const sizesMap = /* @__PURE__ */ new Map([
  ["small", { width: 16, height: 16 }],
  ["medium", { width: 24, height: 24 }],
  ["large", { width: 32, height: 32 }],
  [void 0, { width, height }]
]);
$:
  sizes = sizesMap.get(size);
</script>

<IconUse
	class={generateClassNames(['Icon', className])}
	{icon}
	{...sizes}
	style={`${color ? `--clue-icon-color: ${color};` : ''}${reverse ? `transform: scale${reverse.toUpperCase()}(-1)` : ''}`}
/>

<style>:global(.ClueIcon) {
  color: var(--clue-icon-color, var(--clue-color-icon));
  transition: var(--clue-transition);
  transition-property: color, transform;
}</style>
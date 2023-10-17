<script>import { generateClassNames } from "@cluue/utils";
import { context } from "../context";
import { fly } from "svelte/transition";
import { config } from "@cluue/config";
let className = "";
export { className as class };
export let popoverAction = void 0;
const contextStore = context.get();
const getTransitionParams = (placement) => {
  const space = 10;
  const direction = placement?.split("-")[0] || "bottom";
  switch (direction) {
    case "top":
      return {
        y: space
      };
    case "bottom":
      return {
        y: -space
      };
    case "left":
      return {
        x: space
      };
    case "right":
      return {
        x: -space
      };
  }
};
$:
  action = (node) => {
    const { destroy, update } = (contextStore ? $contextStore.contentAction : popoverAction)?.(node) || {};
    return {
      destroy,
      update
    };
  };
</script>

<div
	class={generateClassNames(['PopoverContent', className])}
	use:action
	transition:fly={{duration: $config.transition.duration, ...getTransitionParams(contextStore && $contextStore.placement)}}
>
	<slot/>
</div>

<style>.CluePopoverContent {
  z-index: 9999;
}</style>
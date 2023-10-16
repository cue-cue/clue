<script>import { context } from "../context";
import { writable } from "svelte/store";
import { createPopoverActions } from "../actions";
import { HoverTrigger } from "../Trigger/hover.js";
import { offset as offsetMiddleware, shift as shiftMiddleware, size as sizeMiddleware, flip as flipMiddleware } from "svelte-floating-ui/core";
import PopoverContent from "../PopoverContent/PopoverContent.svelte";
let className = "";
export let placement = "top";
export let offset = 0;
export let open = false;
export let trigger = "hover";
let targetElementRef = writable(void 0);
let contentElementRef = writable(void 0);
const defOptions = {
  middleware: [
    sizeMiddleware({
      apply({ availableHeight, elements }) {
        if (availableHeight < 150) {
          availableHeight = 150;
        } else if (availableHeight > 350) {
          availableHeight = 350;
        }
        Object.assign(elements.floating.style, {
          maxHeight: `${availableHeight}px`
        });
      }
    }),
    offsetMiddleware(offset),
    flipMiddleware(),
    shiftMiddleware()
  ],
  target: {
    init(node) {
      targetElementRef.set(node);
    },
    destroy() {
      targetElementRef.set(void 0);
    }
  },
  content: {
    init(node) {
      contentElementRef.set(node);
    },
    destroy() {
      contentElementRef.set(void 0);
    }
  },
  trigger: trigger === "hover" ? new HoverTrigger({
    content: contentElementRef,
    target: targetElementRef
  }, {
    open: () => setOpen(true),
    close: () => setOpen(false)
  }) : void 0
};
export const setOpen = (_open) => {
  open = _open;
};
export const toggle = () => {
  setOpen(!open);
};
const {
  targetAction,
  contentAction,
  update
} = createPopoverActions({
  ...defOptions,
  placement
});
const contextStore = context.set(writable({
  targetAction,
  contentAction,
  update,
  placement
}));
$:
  $contextStore.placement = placement;
$:
  update({
    ...defOptions,
    placement
  });
</script>

<slot {targetAction} {update}/>

<slot name='content-wrapper' {contentAction} {update} {open}>
	{#if $$slots.content && open}
		<PopoverContent>
			<slot name='content'/>
		</PopoverContent>
	{/if}
</slot>
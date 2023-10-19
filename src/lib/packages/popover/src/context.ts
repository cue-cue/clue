import { Context } from "@cluue/utils";
import type { Writable } from "svelte/store";
import type { createPopoverActions } from "./actions";
import type { Popover } from "./Popover";
import type { ComponentProps } from "svelte";
import type { PopoverArrowStore } from "./PopoverArrow/store";

type Data = Writable<ReturnType<
    typeof createPopoverActions> & 
    Pick<ComponentProps<Popover>, 'placement'> & 
    {
        arrowStore: PopoverArrowStore
    }
>

export const context = new Context<Data>('Popover')
import { Context } from "@clue/utils";
import type { Writable } from "svelte/store";
import type { createPopoverActions } from "./actions";
import type { Popover } from "./Popover";
import type { ComponentProps } from "svelte";
type Data = Writable<ReturnType<typeof createPopoverActions> & Pick<ComponentProps<Popover>, 'placement'>>;
export declare const context: Context<Data>;
export {};

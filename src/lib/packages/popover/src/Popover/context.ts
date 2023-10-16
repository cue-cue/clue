import { Context } from "@clue/utils";
import type { Writable } from "svelte/store";
import type { createPopoverActions } from "../actions";

type Data = Writable<ReturnType<typeof createPopoverActions>>

export const context = new Context<Data>('Popover')
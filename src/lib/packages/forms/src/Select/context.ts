import { Context } from "@clue/utils";
import type { ComponentProps } from "svelte";
import type { Writable } from "svelte/store";
import type { Select } from "./index.js";

type Data = Writable<Pick<ComponentProps<Select>, 'opened'>>

export const context = new Context<Data>('Select')
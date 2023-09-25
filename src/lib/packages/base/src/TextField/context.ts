import { Context } from "@clue/utils";
import type { ComponentProps } from "svelte";
import type { Writable } from "svelte/store";
import type TextField from "./TextField.svelte";

type Data = Writable<Pick<ComponentProps<TextField>, 'error' | 'disabled' | 'id'>>

export const context = new Context<Data>('TextField')
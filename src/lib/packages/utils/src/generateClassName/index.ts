import { get } from "svelte/store";
import { camelize } from "../index.js";
import { config } from "@clue/config";

export const generateClassName = (className:string, prefix = get(config).prefix):string => camelize(`${prefix} ${className.replace(prefix, '')}`)
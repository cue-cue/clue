import { get } from "svelte/store";
import { camelize } from "../index.js";
import { config } from "@cluue/config";
export const generateClassName = (className, prefix = get(config).prefix) => camelize(`${prefix} ${className.replace(prefix, '')}`);

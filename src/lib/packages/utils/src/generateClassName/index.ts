import { get } from "svelte/store";
import { camelize } from "../index.js";
import { config } from "../../../config.js";

export const generateClassName = (className:string, prefix = get(config).prefix):string => camelize(`${prefix} ${className.replace(prefix, '')}`)
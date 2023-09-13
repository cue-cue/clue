import { camelize } from "../index.js";

export const generateClassName = (className:string, prefix = 'Clue'):string => camelize(`${prefix}${className}`)
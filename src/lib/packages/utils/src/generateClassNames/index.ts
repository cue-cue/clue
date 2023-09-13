import { generateClassName } from "../index.js";

export const generateClassNames = (slots:string[], prefix?:Parameters<typeof generateClassName>[1]):string => slots.filter(slot => Boolean(slot)).map(slot => generateClassName(slot, prefix)).join(' ')
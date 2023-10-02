import { generateClassName } from "../index.js";

export const generateClassNames = (slots:string[], prefix?:Parameters<typeof generateClassName>[1]):string => {
    return slots.filter(slot => Boolean(slot)).map(slot => slot.split(' ')).flat().map(slot => generateClassName(slot, prefix)).join(' ')
}
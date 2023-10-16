import { config } from "@clue/config";
import { get } from "svelte/store";
import { generateClassName } from "../index.js";
export const generateClassNames = (slots, prefix) => {
    const allSlots = new Set([...slots, ...get(config).customClassNames]
        .filter(slot => Boolean(slot))
        .map(slot => slot.split(' '))
        .flat()
        .map(slot => generateClassName(slot, prefix)));
    return Array.from(allSlots).join(' ');
};

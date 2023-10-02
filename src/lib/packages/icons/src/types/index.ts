import type { IconGroups as ClueIconGroups } from "./groups.js";
// import type { IconNames as ClueIconNames } from "./names.js";

type ClueSvgIconData = {
    default: ClueIconGroups[keyof ClueIconGroups],
    size: {
        width: number
        height: number
    }
    groupName: keyof ClueIconGroups
}

export {
    type ClueIconGroups,
    type ClueSvgIconData
}
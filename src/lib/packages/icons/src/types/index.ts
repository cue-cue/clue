//IconGroups-template
type IconGroups = {
  line: 'question-circle' | 'instagram' | 'eye' | 'cross' | 'calendar' | 'angle-down'
}
//IconGroups-template

//IconNames-template
type IconNames<T extends string = 'clue-'> = `${T}line-question-circle` | `${T}line-instagram` | `${T}line-eye` | `${T}line-cross` | `${T}line-calendar` | `${T}line-angle-down`
//IconNames-template

type ClueSvgIconData = {
    default: IconNames,
    size: {
        width: number
        height: number
    }
    groupName: keyof IconGroups
}

export {
    type IconNames,
    type IconGroups,
    type ClueSvgIconData
}
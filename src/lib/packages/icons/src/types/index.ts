//IconGroups-template
type IconGroups = {
  line: 'question-circle' | 'instagram' | 'eye' | 'cross' | 'calendar' | 'bell' | 'angle-down',
  filled: 'bell'
}
//IconGroups-template

//IconNames-template
type IconNames<T extends string = 'clue-'> = `${T}line-question-circle` | `${T}line-instagram` | `${T}line-eye` | `${T}line-cross` | `${T}line-calendar` | `${T}line-bell` | `${T}line-angle-down` | `${T}filled-bell`
//IconNames-template

type ClueSvgIconData = {
    default: IconNames,
    size: {
        width: number
        height: number
    }
    groupName: keyof IconGroups
    name:IconNames<''>
}

export {
    type IconNames,
    type IconGroups,
    type ClueSvgIconData
}
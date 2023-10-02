type IconGroups = {
  test: 'eye',
  line: 'question-circle' | 'instagram' | 'eye' | 'cross' | 'calendar' | 'angle-down'
}
declare module "*.svg" {
    export const size:{
        width: number
        height: number
    }
    export const groupName:keyof IconGroups
    export const name:IconGroups[keyof IconGroups]
    export default name
}
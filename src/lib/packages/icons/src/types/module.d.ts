declare module "*.svg" {
    export const size:{
        width: number
        height: number
    }
    const path:string
    export default path
}
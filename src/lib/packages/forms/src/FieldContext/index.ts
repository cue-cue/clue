import { Context } from '@cluue/utils'
import type { Writable } from 'svelte/store'

interface IData {
    id?:string | null
    name?:string | null
    disabled?:boolean | null
    manual?:boolean
}

export class FieldContext extends Context<Writable<IData>> {
    constructor() {
        super('clueFieldContext')
    }
}

export const fieldContext = new FieldContext()
import { writable, type Writable } from "svelte/store"

type PopoverArrowStoreData = {
    styles: Partial<HTMLDivElement['style']>
    element:Writable<HTMLElement | undefined>
}

export type PopoverArrowStore = Writable<PopoverArrowStoreData>

export const createPopoverArrowStore = ():PopoverArrowStore => {
    return writable<PopoverArrowStoreData>({
        styles: {},
        element: writable(undefined)
    })
}
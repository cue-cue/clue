import { writable } from "svelte/store";

interface IConfigData {
    prefix: string
    customClassNames: string[]
}

const createConfigStore = (data:IConfigData) => {
    const {subscribe, set, update} = writable(data)

    const setPrefix = (prefix:IConfigData['prefix']) => {
        update(data => ({...data, prefix}))
    }

    const setCustomClassNames = (customClassNames:IConfigData['customClassNames']) => {
        update(data => ({...data, customClassNames}))
    }

    return {
        subscribe,
        setCustomClassNames
    }
}

export const config = createConfigStore({
    prefix: 'Clue',
    customClassNames: []
})
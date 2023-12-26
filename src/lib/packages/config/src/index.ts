import { writable } from 'svelte/store'

interface IConfigData {
	prefix: string
	customClassNames: string[]
	transition: {
		delay: number
		duration: number
	}
}

const createConfigStore = (data: IConfigData) => {
	const { subscribe, update } = writable(data)

	// const setPrefix = (prefix:IConfigData['prefix']) => {
	//     update(data => ({...data, prefix}))
	// }

	const setTransition = (transition: Partial<IConfigData['transition']>) => {
		update((data) => {
			data.transition = {
				...(data.transition || {}),
				...transition,
			}
			return data
		})
	}

	const setCustomClassNames = (customClassNames: IConfigData['customClassNames']) => {
		update((data) => ({ ...data, customClassNames }))
	}

	return {
		subscribe,
		setCustomClassNames,
		setTransition,
	}
}

export const config = createConfigStore({
	prefix: 'Clue',
	customClassNames: [],
	transition: {
		delay: 0,
		duration: 200,
	},
})

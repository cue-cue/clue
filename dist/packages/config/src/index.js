import { writable } from "svelte/store";
const createConfigStore = (data) => {
    const { subscribe, update } = writable(data);
    const setPrefix = (prefix) => {
        update(data => ({ ...data, prefix }));
    };
    const setTransition = (transition) => {
        update(data => {
            data.transition = {
                ...(data.transition || {}),
                ...transition
            };
            return data;
        });
    };
    const setCustomClassNames = (customClassNames) => {
        update(data => ({ ...data, customClassNames }));
    };
    return {
        subscribe,
        setCustomClassNames,
        setTransition
    };
};
export const config = createConfigStore({
    prefix: 'Clue',
    customClassNames: [],
    transition: {
        delay: 0,
        duration: 200
    }
});

import { writable } from "svelte/store";

export const colorsStore = writable<Record<string, string>>({
    'primary': '#5B4C9F',
    'active': '#EECD47',
    'positive': '#839E44',
    'negative': '#D15A45',
})
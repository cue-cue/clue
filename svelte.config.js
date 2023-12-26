import adapter from '@sveltejs/adapter-netlify'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		cssHash: (t) => {
			return `clue-${t.hash(t.css + t.name + t.filename)}`
		},
	},
	preprocess: [vitePreprocess()],
	kit: {
		adapter: adapter(),
	},
}

export default config

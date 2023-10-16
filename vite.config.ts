import { viteWatchers } from './scripts/viteWatcher.js'
import { clueIconsPlugin } from './src/lib/packages/icons/src/plugin/index.js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		sveltekit(),
		viteWatchers(
			[
				// new CreateIconsViteWatcher()
			]
		),
		clueIconsPlugin(),
	],
	optimizeDeps: {
		exclude: ['svelte-floating-ui/core', 'svelte-floating-ui']	
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});

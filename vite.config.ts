import { clueIconsPlugin } from './src/lib/packages/icons/src/plugin/index.js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		sveltekit(),
		clueIconsPlugin(),
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});

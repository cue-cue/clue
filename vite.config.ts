import { globSync } from 'glob'
import { clueIconsPlugin } from './src/lib/packages/icons/src/plugin/index.js';
import { sveltekit } from '@sveltejs/kit/vite';
import { env } from 'process';
import { defineConfig, type UserConfig, type Alias } from 'vite';
import {dependencies} from './package.json'
import { readFileSync } from 'fs';
import { resolve } from 'path';

const createAlias = (include:string[]) => {
	const allPackages = globSync('./src/**/package.json').map(packagePath => ({
		...JSON.parse(readFileSync(packagePath, 'utf8')),
		path: packagePath
	})) as {name: string, path:string, main:string}[]

	return Object.keys(dependencies).reduce<Alias[]>((val, dependencyName) => {
		if (include.findIndex(includePath => dependencyName.startsWith(includePath)) !== -1) {

			const thisPackage = allPackages.find(({name}) => name === dependencyName)
			const indexPath = thisPackage?.path.replace('package.json', thisPackage.main)

			if (indexPath) {
				val.push({
					find: dependencyName,
					replacement: resolve(indexPath)
				})
			}
		}
		return val
	}, [])
}

const buildSiteConfig = ():UserConfig => {
	return {
		resolve: {
			alias: createAlias([
				'@cluue/calendar'
			])
		}
	}
}

export default defineConfig({
	plugins: [
		sveltekit(),
		clueIconsPlugin(),
	],
	...(env.npm_lifecycle_event === 'build:site' ? buildSiteConfig() : {})
});

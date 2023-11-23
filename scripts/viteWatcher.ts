import type { HmrContext, PluginOption } from 'vite'

export class ViteWatcher {
	include
	handler
	constructor(include: string[], handler: VoidFunction) {
		this.include = include
		this.handler = handler
	}
	call(hmrContext: HmrContext) {
		if (this.include.findIndex((path) => hmrContext.file.includes(path)) !== -1) {
			this.handler()
		}
	}
}

export const viteWatchers = (watchers: ViteWatcher[]): PluginOption => {
	return {
		name: 'vite-watcher',
		handleHotUpdate(hmrContext) {
			watchers.forEach((watcher) => {
				watcher.call(hmrContext)
			})
		}
	}
}

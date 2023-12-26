import { get } from 'svelte/store'
import { Trigger } from './index.js'
import { outclick } from '$lib/packages/utils/src/index.js'

export interface IClickTriggerOptions {
	delay: [number, number] | number
}

const createOutClickHandler = (handler: VoidFunction) => {
	let initResult: ReturnType<typeof outclick>
	const init = (node: HTMLElement) => {
		initResult = outclick(node, {
			handler,
		})
	}
	const destroy = () => {
		initResult?.destroy?.()
	}

	return {
		destroy,
		init,
	}
}

export class ClickTrigger extends Trigger {
	options
	constructor(
		elements: Trigger['elements'],
		events: Trigger['events'],
		options?: IClickTriggerOptions,
	) {
		super(elements, events)
		this.options = options

		const outclick = createOutClickHandler(() => {
			this.closeWithDelay(0)
		})

		this.setHandlers({
			target: {
				click: () => {
					this.openWithoutDelay()
				},
			},
			content: {
				init: () => {
					const element = get(this.elements.content)
					if (element) {
						outclick.init(element)
					}
				},
				destroy: () => {
					outclick.destroy()
				},
			},
		})
	}

	openWithoutDelay() {
		clearTimeout(this.closeWithDelayTimeout)
		this.open()
	}

	closeWithDelayTimeout?: ReturnType<typeof setTimeout>
	closeWithDelay(delay = this.getDelay().close) {
		clearTimeout(this.closeWithDelayTimeout)
		this.closeWithDelayTimeout = setTimeout(() => {
			this.close()
		}, delay)
	}

	getDelay() {
		let delay = this.options?.delay || [100, 200]
		if (typeof delay === 'number') {
			delay = [delay, delay]
		}
		return {
			open: delay[0],
			close: delay[1],
		}
	}
}

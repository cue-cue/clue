import { get } from 'svelte/store'
import { Trigger } from './index.js'

export interface IHoverTriggerOptions {
	delay: [number, number] | number
}

export class HoverTrigger extends Trigger {
	options
	constructor(
		elements: Trigger['elements'],
		events: Trigger['events'],
		options?: IHoverTriggerOptions,
	) {
		super(elements, events)
		this.options = options
		this.setHandlers({
			target: {
				mouseenter: () => {
					this.openWithDelay()
				},
				mouseleave: (e) => {
					{
						if (e.relatedTarget) {
							if (!get(this.elements.content)?.contains(e.relatedTarget as Node)) {
								this.closeWithDelay()
							}
						} else {
							this.closeWithDelay()
						}
					}
				},
			},
			content: {
				mouseenter: () => {
					this.openWithDelay()
				},
				mouseleave: (e) => {
					{
						if (e.relatedTarget) {
							if (!get(this.elements.target)?.contains(e.relatedTarget as Node)) {
								this.closeWithDelay()
							}
						} else {
							this.closeWithDelay()
						}
					}
				},
			},
		})
	}

	openWithDelayTimeout?: ReturnType<typeof setTimeout>
	openWithDelay() {
		clearTimeout(this.closeWithDelayTimeout)
		this.openWithDelayTimeout = setTimeout(() => {
			this.open()
		}, this.getDelay().open)
	}

	closeWithDelayTimeout?: ReturnType<typeof setTimeout>
	closeWithDelay() {
		clearTimeout(this.openWithDelayTimeout)
		this.closeWithDelayTimeout = setTimeout(() => {
			this.close()
		}, this.getDelay().close)
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

import { get } from 'svelte/store'
import { Trigger } from './index.js'

export interface IClickTriggerOptions {
	delay: [number, number] | number
}

export class ClickTrigger extends Trigger {
	options
	constructor(elements: Trigger['elements'], events: Trigger['events'], options?: IClickTriggerOptions) {
		super(elements, events)
		this.options = options

		this.setHandlers({
			target: {
				click: () => {
					this.openWithoutDelay()
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
				}
			},
			content: {
				mouseenter: () => {
					this.openWithoutDelay()
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
				}
			}
		})
	}

	openWithoutDelay() {
		clearTimeout(this.closeWithDelayTimeout)
		this.open()
	}

	closeWithDelayTimeout?: ReturnType<typeof setTimeout>
	closeWithDelay() {
		clearTimeout(this.closeWithDelayTimeout)
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
			close: delay[1]
		}
	}
}

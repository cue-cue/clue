/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Writable } from 'svelte/store'
import type { PopoverEvents } from '../actions/index.js'

type TriggerHandlers = Partial<PopoverEvents & { init: VoidFunction; destroy: VoidFunction }>
export class Trigger {
	handlers!: {
		target?: TriggerHandlers
		content?: TriggerHandlers
	}
	elements
	events
	constructor(
		elements: Record<'target' | 'content', Writable<HTMLElement | undefined>>,
		events: {
			open?: VoidFunction
			close?: VoidFunction
		}
	) {
		this.elements = elements
		this.events = events
	}
	setHandlers(handlers: Trigger['handlers']) {
		this.handlers = handlers
	}
	open() {
		this.events?.open?.()
	}
	close() {
		this.events?.close?.()
	}
}

export class TriggerCombinator {
	trigger
	handlers: Trigger['handlers']
	constructor(trigger: Trigger | Trigger[]) {
		this.trigger = [trigger].flat()
		this.handlers = this.createHandlers(this.trigger)
	}
	createHandlers(trigger = this.trigger): TriggerCombinator['handlers'] {
		type ReduceResult = Record<
			'target' | 'content',
			Partial<{
				[K in keyof PopoverEvents]: Array<PopoverEvents[K]>
			}>
		>
		const res = trigger.reduce<Partial<ReduceResult>>((val, trigger) => {
			Object.entries(trigger.handlers).forEach(([_name, handlers]) => {
				const name = _name as keyof typeof val
				Object.entries(handlers).forEach(([_eventName, handler]) => {
					const eventName = _eventName as keyof PopoverEvents
					if (!val[name]) {
						val[name] = {}
					}
					if (val[name]?.[eventName]) {
						//@ts-ignore
						val[name][eventName].push(handler)
					} else {
						//@ts-ignore
						val[name][eventName] = [handler]
					}
				})
			})
			return val
		}, {})

		return Object.entries(res).reduce<TriggerCombinator['handlers']>((val, [_name, handlers]) => {
			const name = _name as keyof typeof val
			Object.entries(handlers).forEach(([eventName, handlers]) => {
				if (!val[name]) {
					val[name] = {}
				}
				//@ts-ignore
				val[name][eventName] = (e) => handlers.forEach((handler) => handler(e))
			})
			return val
		}, {})
	}
}

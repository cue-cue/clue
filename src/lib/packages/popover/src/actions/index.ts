import { createFloatingActions, type ComputeConfig } from 'svelte-floating-ui'
import type { ActionReturn } from 'svelte/action'
import { TriggerCombinator, type Trigger } from '../Trigger/index.js'

export type PopoverEvents = {
	[K in keyof HTMLElementEventMap]: (event: HTMLElementEventMap[K]) => void
}
export interface IPopoverTargetOrContentTriggers {
	init: (node: HTMLElement) => void
	destroy: () => void
}

export interface IPopoverOptions extends ComputeConfig {
	target?: Partial<IPopoverTargetOrContentTriggers>
	content?: Partial<IPopoverTargetOrContentTriggers>
	trigger?: Trigger | Trigger[]
}

const events = (action: 'add' | 'remove', node: HTMLElement, handlers: Partial<PopoverEvents>) => {
	if (!Object.keys(handlers).length) return
	const methodMap = new Map<typeof action, Extract<keyof typeof node, 'addEventListener' | 'removeEventListener'>>([
		['add', 'addEventListener'],
		['remove', 'removeEventListener']
	])

	const method = methodMap.get(action) || 'removeEventListener'

	Object.entries(handlers).forEach(([eventName, handler]) => {
		if (['destroy', 'init'].includes(eventName)) return

		node[method](eventName, handler as EventListenerOrEventListenerObject)
	})
}

export const createPopoverActions = (options: IPopoverOptions) => {
	const [_targetAction, _contentAction, update] = createFloatingActions(options)

	const triggerCombinator = options.trigger && new TriggerCombinator(options.trigger)

	const targetAction = (node: HTMLElement): ActionReturn => {
		const rootActionResult = _targetAction(node) as unknown as Partial<ActionReturn<unknown>>
		const targetHandlers = triggerCombinator?.handlers.target || {}

		options?.target?.init?.(node)
		targetHandlers.init?.()

		events('add', node, targetHandlers)

		const destroy = () => {
			events('remove', node, targetHandlers)

			targetHandlers.destroy?.()
			options?.target?.destroy?.()
			rootActionResult?.destroy?.()
		}

		const update = (params: unknown) => {
			rootActionResult?.update?.(params)
		}

		return {
			destroy,
			update
		}
	}

	const contentAction = (node: HTMLElement): ActionReturn => {
		const rootActionResult = _contentAction(node) as unknown as Partial<ActionReturn<unknown>>
		const contentHandlers = triggerCombinator?.handlers.content || {}

		options?.content?.init?.(node)
		contentHandlers.init?.()

		events('add', node, contentHandlers)

		const destroy = () => {
			events('remove', node, contentHandlers)

			contentHandlers.destroy?.()
			options?.content?.destroy?.()
			rootActionResult?.destroy?.()
		}

		const update = (params: unknown) => {
			rootActionResult?.update?.(params)
		}

		return {
			destroy,
			update
		}
	}

	return {
		targetAction,
		contentAction,
		update
	}
}

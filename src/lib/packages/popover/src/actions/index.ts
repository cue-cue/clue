import { createFloatingActions, type ComputeConfig } from "svelte-floating-ui";
import type { ActionReturn } from "svelte/action";

export type PopoverTargetEvents = {
    [K in keyof HTMLElementEventMap]: (event:HTMLElementEventMap[K]) => void
}

export interface IPopoverTargetOrContentTriggers {
    init: (node:HTMLElement) => void
    destroy: () => void
}

export interface IPopoverOptions extends ComputeConfig {
    target?: Partial<IPopoverTargetOrContentTriggers>
    content?: Partial<IPopoverTargetOrContentTriggers>
    on?: {
        target?:Partial<PopoverTargetEvents>
    }
}

export const createPopoverActions = (options:IPopoverOptions) => {
    const [_targetAction, _contentAction, update] = createFloatingActions(options)

    const targetAction = (node:HTMLElement):ActionReturn => {
		const rootActionResult = _targetAction(node) as unknown as Partial<ActionReturn<unknown>>
        
        options?.target?.init?.(node)

        const targetHandlers = options?.on?.target || {}

        Object.entries(targetHandlers).forEach(([eventName, handler]) => {
            node.addEventListener(eventName, handler as EventListenerOrEventListenerObject)
        })

		const destroy = () => {
            Object.entries(targetHandlers).forEach(([eventName, handler]) => {
                node.addEventListener(eventName, handler as EventListenerOrEventListenerObject)
            })
            options?.target?.destroy?.()
			rootActionResult?.destroy?.()
		}

		const update = (params:unknown) => {
			rootActionResult?.update?.(params)
		}

		return {
			destroy,
			update
		}
	}

    const contentAction = (node:HTMLElement):ActionReturn => {
        const rootActionResult = _contentAction(node) as unknown as Partial<ActionReturn<unknown>>

        options?.content?.init?.(node)

        const destroy = () => {
            options?.content?.destroy?.()
            rootActionResult?.destroy?.()
        }

        const update = (params:unknown) => {
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
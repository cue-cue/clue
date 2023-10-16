import type { ActionReturn } from "svelte/action"

type ActionFunction<T> = (node:HTMLElement, params:T) => Partial<ActionReturn<T>> | undefined

export const createAction = <T, U extends (...args: never[]) => unknown = ActionFunction<T>>(name:string, action:U, params?:Parameters<U>[1]) => {
    return {
        name,
        action,
        params
    }
}

export type ActionListParams = Array<ReturnType<typeof createAction>>

export type ActionList = <T extends ActionListParams>(node:HTMLElement, actions?:T) => ActionReturn<T>

export const actionList:ActionList = (node, actions) => {
    let isInit = false

    const updateHandlers = new Map<string, ActionReturn<unknown>['update']>()
    const destroyHandlers = new Map<string, ActionReturn<unknown>['destroy']>()

    const init = (_actions:typeof actions) => {
        if (!_actions?.length) return
        _actions.forEach(({name, action, params}) => {
            const {update, destroy} = action(node, params) || {}
            if (update) {
                updateHandlers.set(name, update)
            }
            if (destroy) {
                destroyHandlers.set(name, destroy)
            }
        })    
        isInit = true
    }

    if (actions?.length) {
        init(actions)
    }


    return {
        update(actions) {
            if (isInit) {
                actions.forEach(({name, params}) => {
                    updateHandlers.get(name)?.(params)
                })
            } else {
                init(actions)
            }
        },
        destroy() {
            destroyHandlers.forEach(handler => handler?.())
        }
    }
}
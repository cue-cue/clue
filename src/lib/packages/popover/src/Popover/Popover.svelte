<script lang='ts'>
	import { context } from '../context'
	import { writable } from 'svelte/store'
	import { createPopoverActions, type IPopoverOptions } from '../actions'
	import type { ComputeConfig } from 'svelte-floating-ui'
	import { HoverTrigger } from '../Trigger/hover.js'
	import { offset as offsetMiddleware, shift as shiftMiddleware, size as sizeMiddleware, flip as flipMiddleware, type OffsetOptions } from 'svelte-floating-ui/core'
	import PopoverContent from '../PopoverContent/PopoverContent.svelte'
		
	interface $$Props {
		/**
		 * @default true
		 */
		inline?:boolean
		/**
		 * @default 'top'
		 */
		placement?:ComputeConfig['placement']
		/**
		 * @default 0
		 */
		offset?:OffsetOptions
		/**
		 * @default false
		 */
		open?:boolean
		/**
		 * @default 'hover'
		 */
		trigger?:'hover' | false
	}
	
	let className = ''
	export let placement:$$Props['placement'] = 'top'
	export let offset:$$Props['offset'] = 0
	export let open:$$Props['open'] = false
	export let trigger:$$Props['trigger'] = 'hover'

	let targetElementRef = writable<HTMLElement | undefined>(undefined)
	let contentElementRef = writable<HTMLElement | undefined>(undefined)

	const defOptions:IPopoverOptions = {
		middleware: [
			sizeMiddleware({
				apply({availableHeight, elements}) {
					if (availableHeight < 150) {
						availableHeight = 150
					} else if (availableHeight > 350) {
						availableHeight = 350
					} 
					Object.assign(elements.floating.style, {
						maxHeight: `${availableHeight}px`,
					});
				}
			}),
			offsetMiddleware(offset),
			flipMiddleware(),
			shiftMiddleware()
		],
		target: {
			init(node) {
				targetElementRef.set(node)
			},
			destroy() {
				targetElementRef.set(undefined)
			}
		},
		content: {
			init(node) {
				contentElementRef.set(node)
			},
			destroy() {
				contentElementRef.set(undefined)
			}
		},
		trigger: trigger === 'hover' ? new HoverTrigger({
			content: contentElementRef,
			target: targetElementRef
		},{
			open: () => setOpen(true),
			close: () => setOpen(false)
		}) : undefined
	}

	export const setOpen = (_open:typeof open) => {
		open = _open
	}

	export const toggle = () => {
		setOpen(!open)
	}

	const {
		targetAction,
		contentAction,
		update
	} = createPopoverActions({
		...defOptions,
		placement,
	})

	const contextStore = context.set(writable({
		targetAction,
		contentAction,
		update,
		placement
	}))

	$: $contextStore.placement = placement

	$: update({
		...defOptions,
		placement
	})
</script>

<slot {targetAction} {update}/>

<slot name='content-wrapper' {contentAction} {update} {open}>
	{#if $$slots.content && open}
		<PopoverContent>
			<slot name='content'/>
		</PopoverContent>
	{/if}
</slot>
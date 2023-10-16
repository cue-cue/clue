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
		 * @default 5
		 */
		offset?:OffsetOptions
		/**
		 * @default false
		 */
		open?:boolean
	}
	
	let className = ''
	export let placement:$$Props['placement'] = 'top'
	export let offset:$$Props['offset'] = 10
	export let open:$$Props['open'] = false

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
		trigger: new HoverTrigger({
			content: contentElementRef,
			target: targetElementRef
		},{
			open: () => setOpen(true),
			close: () => setOpen(false)
		})
	}

	const setOpen = (_open:typeof open) => {
		open = _open
	}

	const toggle = () => {
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
	context.set(writable({
		targetAction,
		contentAction,
		update
	}))

	$: update({
		...defOptions,
		placement
	})
</script>

<slot action={targetAction} {update}/>

<slot name='content-wrapper' action={contentAction} {update} {open}>
	{#if $$slots.content && open}
		<PopoverContent>
			<slot name='content'/>
		</PopoverContent>
	{/if}
</slot>
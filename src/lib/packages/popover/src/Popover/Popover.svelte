<script lang='ts'>
	import { context } from '../context'
	import { writable } from 'svelte/store'
	import { createPopoverActions, type IPopoverOptions } from '../actions'
	import { arrow as arrowMiddleware, type ComputeConfig } from 'svelte-floating-ui'
	import { HoverTrigger } from '../Trigger/hover.js'
	import { offset as offsetMiddleware, shift as shiftMiddleware, size as sizeMiddleware, flip as flipMiddleware, type OffsetOptions, type ArrowOptions, type Middleware } from 'svelte-floating-ui/core'
	import PopoverContent from '../PopoverContent/PopoverContent.svelte'
	import PopoverTarget from '../PopoverTarget/PopoverTarget.svelte'
	import PopoverArrow from '../PopoverArrow/PopoverArrow.svelte'
	import { createPopoverArrowStore } from '../PopoverArrow/store'
	import type { U } from 'vitest/dist/reporters-5f784f42'
		
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
		 * @default undefined
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
		/**
		 * @default false
		 */
		arrow?:boolean
	}
	
	export let placement:$$Props['placement'] = 'top'
	export let offset:$$Props['offset'] = undefined
	export let open:$$Props['open'] = false
	export let trigger:$$Props['trigger'] = 'hover'
	export let arrow:$$Props['arrow'] = true

	let targetElementRef = writable<HTMLElement | undefined>(undefined)
	let contentElementRef = writable<HTMLElement | undefined>(undefined)

	const arrowStore = createPopoverArrowStore()
	const arrowRef = writable<HTMLElement | undefined>(undefined)

	const arrowOptions:{
		middleware: Middleware[]
		onComputed:NonNullable<IPopoverOptions['onComputed']>
	} = {
		middleware: arrow ? [arrowMiddleware({
			element: arrowRef
		})] : [],
		onComputed({placement,middlewareData}) {
			if (!arrow) return
			const { x, y} = middlewareData.arrow || {};

			const arrowData = {
				height: arrowRef ? $arrowRef?.clientHeight || 0 : 0,
				width: arrowRef ? $arrowRef?.clientWidth || 0 : 0
			}

			console.log(arrowData)

			const arrowSideMap = {
				top: 'bottom',
				right: 'left',
				bottom: 'top',
				left: 'right',
			}

			const arrowRotateMap:Record<keyof typeof arrowSideMap, `${string}deg`> = {
				'top': '0deg',
				'right': '90deg',
				'bottom': '180deg',
				'left': '-90deg',
			}

			const contentPlacement = (placement.split('-')[0] || 'bottom') as unknown as keyof typeof arrowSideMap

			const arrowSide = arrowSideMap[contentPlacement]
			const rotate = arrowRotateMap[contentPlacement]
			console.log(contentPlacement)

			const styles:Record<string, string> = {
				left: x != null ? `${x}px` : '',
				top: y != null ? `${y}px` : '',
				transform: `rotate(${rotate})`
			}

			styles[arrowSide] = `-${['bottom', 'top'].includes(contentPlacement) ? arrowData.height : ((arrowData.width + arrowData.height) / 2)}px`,

			console.log(styles)

			$arrowStore.styles = styles
		}
	}

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
			offsetMiddleware((data) => {
				if (typeof offset === 'object') {
					return offset
				} else if (typeof offset === 'function') {
					return offset(data)
				}

				const arrowData = {
					height: arrowRef ? $arrowRef?.clientHeight || 0 : 0,
					width: arrowRef ? $arrowRef?.clientWidth || 0 : 0
				}
				
				if (arrow) {
					return arrowData.height
				} else {
					return offset || 0
				}
			}),
			shiftMiddleware(),
			flipMiddleware(),
			...(arrowOptions.middleware)

		],
		onComputed(computed) {
			arrowOptions.onComputed(computed)
		},
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
		arrowStore,
		placement
	}))

	$: $contextStore.placement = placement

	$: update({
		...defOptions,
		placement
	})
</script>

<slot name='target' {targetAction} {update}>
	<PopoverTarget>
		<slot/>
	</PopoverTarget>
</slot>


<slot name='content-wrapper' {contentAction} {update} {open}>
	{#if $$slots.content && open}
		<PopoverContent>
			<slot name='content'/>
			<svelte:fragment slot='arrow'>
				<slot name='arrow'>
					{#if arrow}
						<PopoverArrow bind:nodeElement={$arrowRef}/>
					{/if}
				</slot>
			</svelte:fragment>
		</PopoverContent>
	{/if}
</slot>
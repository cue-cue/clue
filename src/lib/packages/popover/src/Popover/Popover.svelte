<script lang='ts'>
	import {generateClassNames} from '@clue/utils'

	import { context } from './context'
	import { writable } from 'svelte/store'
	import { createPopoverActions, type IPopoverOptions } from '../actions'
	import type { ComputeConfig } from 'svelte-floating-ui'
	import { HoverTrigger } from '../Trigger/hover.js'

	interface $$Props {
		class?:string
		inline?:boolean
		placement?:ComputeConfig['placement']
		open?:boolean
	}
	
	let className = ''
	export { className as class }
	export let inline:$$Props['inline'] = true
	export let placement:$$Props['placement'] = 'top'
	export let open:$$Props['open'] = false

	let targetElementRef = writable<HTMLElement | undefined>(undefined)
	let contentElementRef = writable<HTMLElement | undefined>(undefined)

	const defOptions:IPopoverOptions = {
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

{#if inline}
	<slot action={targetAction} {update}/>
	{#if open}
		<slot action={contentAction} name='content' {update}/>
	{/if}
{:else}
	<div class={generateClassNames(['Popover', className])}>
		<slot action={targetAction} {update}/>
		{#if open}
			<slot action={contentAction} name='content' {update}/>
		{/if}
	</div>
{/if}


<style lang='sass'>
	.CluePopover
		position: relative
</style>
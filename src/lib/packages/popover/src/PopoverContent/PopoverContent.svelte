<script lang='ts'>
	import {generateClassNames} from '@clue/utils'
	import { context } from '../context'
	import type { createPopoverActions } from '../actions'
	import { fly } from 'svelte/transition'
	import { config } from '$lib/packages/config'

	interface $$Props {
		class?:string
		popoverAction?: ReturnType<typeof createPopoverActions>['contentAction']
	}
	
	let className = ''
	export { className as class }
	export let popoverAction:$$Props['popoverAction'] = undefined

	const contextStore = context.get()

	$: action = (node:HTMLElement) => {
		const {destroy, update} = ($contextStore.contentAction || popoverAction)(node) || {}
		return {
			destroy,
			update
		}
	}
	
</script>

<div class={generateClassNames(['PopoverContent', className])} use:action transition:fly={{duration: $config.transition.duration, y: 10}}>
	<slot/>
</div>

<style lang='sass'>
	.CluePopoverContent
		background: #fff
		border-radius: var(--clue-size-border-radius-2)
		border: 2px solid var(--clue-color-primary-200)
		padding: 16px
		z-index: 9999
</style>
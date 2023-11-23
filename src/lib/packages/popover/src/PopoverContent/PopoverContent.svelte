<script lang="ts">
	import { generateClassNames } from '@cluue/utils'
	import { context } from '../context'
	import type { createPopoverActions } from '../actions'
	import { fly } from 'svelte/transition'
	import { config } from '@cluue/config'
	import type { ComputeConfig } from 'svelte-floating-ui'
	import type { HTMLAttributes } from 'svelte/elements'
	import PopoverArrow from '../PopoverArrow/PopoverArrow.svelte'

	interface $$Props
		extends HTMLAttributes<HTMLDivElement>,
			Partial<Record<`data-${string}`, string>> {
		class?: string
		popoverAction?: ReturnType<typeof createPopoverActions>['contentAction']
	}

	let className = ''
	export { className as class }
	export let popoverAction: $$Props['popoverAction'] = undefined

	const contextStore = context.get()

	const getTransitionParams = (placement?: ComputeConfig['placement']) => {
		const space = 10
		const direction = placement?.split('-')[0] || 'bottom'
		switch (direction) {
			case 'top':
				return {
					y: space
				}
			case 'bottom':
				return {
					y: -space
				}
			case 'left':
				return {
					x: space
				}
			case 'right':
				return {
					x: -space
				}
		}
	}

	$: action = (node: HTMLElement) => {
		const { destroy, update } =
			(contextStore ? $contextStore.contentAction : popoverAction)?.(node) || {}
		return {
			destroy,
			update
		}
	}
</script>

<div
	class={generateClassNames(['PopoverContent', className])}
	use:action
	transition:fly={{
		duration: $config.transition.duration,
		...getTransitionParams(contextStore && $contextStore.placement)
	}}
	{...$$restProps}
>
	<slot />
	<slot name="arrow">
		{#if $contextStore.arrow}
			<PopoverArrow />
		{/if}
	</slot>
</div>

<style lang="sass">
	.CluePopoverContent
		z-index: 9999
</style>

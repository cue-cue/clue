<script lang='ts'>
	import {generateClassNames} from '@cluue/utils'
	import { context } from '../context'
	import { onDestroy } from 'svelte'

	interface $$Props {
		class?:string
		nodeElement?:HTMLElement
	}
	
	let className = ''
	export { className as class }
	export let nodeElement:$$Props['nodeElement'] = undefined

	const contextStore = context.get()

	const arrowStore = contextStore && $contextStore?.arrowStore

	$: styles = Object.entries(arrowStore ? $arrowStore.styles : {}).map(([name, val]) => `${name}: ${val}`).join('; ')
	$: arrowStore && ($arrowStore.element.set(nodeElement))

	onDestroy(() => {
		arrowStore && ($arrowStore.element.set(undefined))
	})
</script>
{#if !contextStore || $contextStore.arrow}
	<div bind:this={nodeElement} style={styles} class={generateClassNames(['PopoverArrow', className])}>
		<slot><div></div></slot>
	</div>
{/if}

<style lang='sass'>
	@import './PopoverArrow'
	:global(body)
		+popover-arrow-vars()
	.CluePopoverArrow
		--width: calc(var(--clue-popover-arrow-width) - 2px)
		--height: calc(var(--clue-popover-arrow-height) + 2px)
		--background-color: var(--clue-popover-arrow-background-color)
		position: absolute
		display: inline-block
		div
			width: 0
			height: 0
			border-style: solid
			border-width: var(--height) var(--width) 0 var(--width)
			border-color: var(--background-color) transparent transparent transparent
</style>
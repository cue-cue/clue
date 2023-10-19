<script lang='ts'>
	import {generateClassNames} from '@cluue/utils'
	import { context } from '../context'
	import { writable } from 'svelte/store'

	interface $$Props {
		class?:string
		nodeElement?:HTMLElement
	}
	
	let className = ''
	export { className as class }
	export let nodeElement:$$Props['nodeElement'] = undefined

	const contextStore = context.get() || writable({})

	const arrowStore = $contextStore?.arrowStore

	$: styles = Object.entries(arrowStore ? $arrowStore.styles : {}).map(([name, val]) => `${name}: ${val}`).join('; ')
</script>
<div bind:this={nodeElement} style={styles} class={generateClassNames(['PopoverArrow', className])}>
	<slot><div></div></slot>
</div>

<style lang='sass'>
	.CluePopoverArrow
		position: absolute
		display: inline-block
		div
			width: 40px
			height: 10px
			background-image: url("data:image/svg+xml,%3Csvg width='8' height='5' viewBox='0 0 8 5' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 5L0 0L8 0L4 5Z' fill='%2332343E'/%3E%3C/svg%3E%0A")
			background: red
			background-size: cover
			background-repeat: no-repeat
</style>
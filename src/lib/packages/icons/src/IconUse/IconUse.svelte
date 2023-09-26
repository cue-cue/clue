<script lang="ts">
	import {generateClassNames} from '@clue/utils'
	import type { IIcon } from '../types/index.js';

	interface $$Props {
		icon:IIcon
		class?:string
		width?:number
		ratio?:number
		height?:number
		nodeElement?:HTMLOrSVGElement
	}
	
	let className = ''
	export { className as class }
	export let icon:$$Props['icon']
	export let width:$$Props['width'] = icon.size.width
	export let height:$$Props['height'] = icon.size.height
	export let nodeElement:$$Props['nodeElement'] = undefined

	$: sizes = {
		width: width ?? icon.size.width,
		height: height ?? icon.size.height
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<svg
	class={generateClassNames(['IconUse', className])}
	role='img'
	on:click
	bind:this={nodeElement}
	{...sizes}
	viewBox={`0 0 ${sizes.width} ${sizes.height}`}
>
	<use xlink:href={`#${icon.default}`} />
</svg>

<style lang="sass">
	.ClueIconUse
		display: block
		transition: var(--transition)
		transition-property: color
</style>

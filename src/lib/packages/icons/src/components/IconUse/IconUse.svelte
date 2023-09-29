<script lang="ts">
	import {generateClassNames} from '@clue/utils'
	import type { SVGAttributes } from 'svelte/elements';
	import type { IIcon } from '../../types/index.js';

	interface $$Props extends SVGAttributes<SVGElement> {
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
	export let width:$$Props['width'] = undefined
	export let height:$$Props['height'] = undefined
	export let nodeElement:$$Props['nodeElement'] = undefined

	$: sizes = {
		width: width ?? icon.size.width,
		height: height ?? width ?? icon.size.height
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<svg
	class={generateClassNames(['IconUse', className])}
	role='img'
	on:click
	bind:this={nodeElement}
	{...sizes}
	{...$$restProps}
	viewBox={`0 0 ${sizes.width} ${sizes.height}`}
>
	<use xlink:href={`#${icon.default}`} />
</svg>
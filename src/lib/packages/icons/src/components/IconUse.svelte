<script lang="ts">
	import {generateClassNames} from '@clue/utils'
	import type { SVGAttributes } from 'svelte/elements';
	import type { ClueSvgIconData } from '../index.js';
	import { fade, type TransitionConfig } from 'svelte/transition';
	import { config } from '$lib/packages/config.js'

	interface $$Props extends SVGAttributes<SVGElement> {
		icon:ClueSvgIconData['default']
		class?:string
		width?:number
		ratio?:number
		height?:number
		nodeElement?:HTMLOrSVGElement
		transitionFn?:(node:Element, params:unknown) => TransitionConfig
	}
	
	let className = ''
	export { className as class }
	export let icon:$$Props['icon']
	export let width:$$Props['width'] = undefined
	export let height:$$Props['height'] = undefined
	export let nodeElement:$$Props['nodeElement'] = undefined
	export let transitionFn:$$Props['transitionFn'] = undefined

	$: sizes = {
		width: width ?? 24,
		height: height ?? width ?? 24
	}

	$: transition = transitionFn ?? fade
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<svg
	bind:this={nodeElement}
	class={generateClassNames(['IconUse', className])}
	role='img'
	{...$$restProps}
	{...sizes}
	viewBox={`0 0 ${sizes.width} ${sizes.height}`}
	on:click
>
	{#key icon}
		<use transition:transition={$config.transition} xlink:href={`#${icon}`} />
	{/key}
</svg>
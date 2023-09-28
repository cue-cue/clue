<script lang='ts'>
	import {IconUse} from '../IconUse/index.js';
	import {generateClassNames} from '@clue/utils'
	import type { ComponentProps } from 'svelte';

	interface $$Props extends Pick<ComponentProps<IconUse>, 'icon' | 'width' | 'height'> {
		class?:string
	}
	
	let className = ''
	export { className as class }
	export let icon:$$Props['icon']
	export let width:$$Props['width'] = undefined
	export let height:$$Props['height'] = undefined
	
</script>

<IconUse
	class={generateClassNames(['Icon', className])}
	{icon}
	{width}
	{height}
/>

<style lang='sass'>
	.ClueIcon
</style>
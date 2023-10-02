<script lang='ts'>
	import { Icon } from '@clue/icons';
	import {generateClassNames} from '@clue/utils'
	import type { ComponentProps } from 'svelte';
	import { fade } from 'svelte/transition';

	interface $$Props extends ComponentProps<Icon> {
		class?:string
	}
	
	let className = ''
	export { className as class }
	export let icon:$$Props['icon']
	
</script>

<div class={generateClassNames(['ButtonIcon', className])} transition:fade|local={{duration: 200}}>
	<Icon width={24} {icon} {...$$restProps}/>
</div>

<style lang='sass'>
	.ClueButtonIcon
		--clue-icon-color: currentColor
		display: flex
		align-items: center
		justify-content: center
		:global(.ClueIcon)
			width: 100%
			height: 100%
</style>
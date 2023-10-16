<script lang='ts'>
	import { Icon } from '@cluue/icons';
	import {generateClassNames} from '@cluue/utils'
	import type { ComponentProps } from 'svelte';

	interface $$Props extends ComponentProps<Icon> {
		class?:string
	}
	
	let className = ''
	export { className as class }
	export let icon:$$Props['icon']
	
</script>

<div class={generateClassNames(['ButtonIcon', className])}>
	<Icon width={24} {icon} {...$$restProps}/>
</div>

<style lang='sass'>
	.ClueButtonIcon
		--clue-icon-color: currentColor
		display: flex
		align-items: center
		justify-content: center
		:global(.ClueIcon)
			transition-property: none
			width: 100%
			height: 100%
</style>
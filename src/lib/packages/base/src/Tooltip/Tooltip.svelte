<script lang='ts'>
	import Popover from '$lib/packages/popover/src/Popover/Popover.svelte'
	import {generateClassNames} from '@cluue/utils'
	import TooltipContent from './TooltipContent.svelte'
	import type { ComponentProps } from 'svelte'

	interface $$Props extends ComponentProps<Popover> {
		class?:string
	}
	
	let className = ''
	export { className as class }

	export let arrow:$$Props['arrow'] = true
	
</script>

<Popover {...$$restProps} {arrow}>
	<slot/>
	<svelte:fragment slot='content-wrapper' let:open>
		{#if open}
			<TooltipContent class={generateClassNames(['Tooltip', className])}>
				<slot name='content'/>
			</TooltipContent>
		{/if}
	</svelte:fragment>
</Popover>
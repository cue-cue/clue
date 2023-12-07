<script lang="ts">
	import { Popover } from '@cluue/popover'
	import { generateClassNames } from '@cluue/utils'
	import TooltipContent from './TooltipContent.svelte'
	import type { ComponentProps } from 'svelte'

	interface $$Props extends ComponentProps<Popover> {
		class?: string
		size?: ComponentProps<TooltipContent>['size']
		theme?: ComponentProps<TooltipContent>['theme']
	}

	let className = ''
	export { className as class }

	export let arrow: $$Props['arrow'] = true
	export let size: $$Props['size'] = undefined
	export let theme: $$Props['theme'] = undefined
</script>

<Popover {...$$restProps} {arrow} class={generateClassNames(['Tooltip', className])} autoSize={true}>
	<slot />
	<svelte:fragment slot="content-wrapper" let:open>
		{#if open}
			<TooltipContent {size} {theme}>
				<slot name="content" />
			</TooltipContent>
		{/if}
	</svelte:fragment>
</Popover>

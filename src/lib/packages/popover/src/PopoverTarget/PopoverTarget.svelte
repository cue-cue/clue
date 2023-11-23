<script lang="ts">
	import { generateClassNames } from '@cluue/utils'
	import { context } from '../context'
	import type { createPopoverActions } from '../actions'

	interface $$Props {
		class?: string
		popoverAction?: ReturnType<typeof createPopoverActions>['targetAction']
	}

	let className = ''
	export { className as class }
	export let popoverAction: $$Props['popoverAction'] = undefined

	const contextStore = context.get()

	$: action = (node: HTMLElement) => {
		const { destroy, update } =
			(contextStore ? $contextStore.targetAction : popoverAction)?.(node) || {}
		return {
			destroy,
			update
		}
	}
</script>

<div class={generateClassNames(['PopoverTarget', className])} use:action>
	<slot />
</div>

<style lang="sass">
	.CluePopoverTarget
		display: inline-block
		pointer-events: none
	:global(.CluePopoverTarget > *)
		pointer-events: auto
</style>

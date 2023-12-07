<script lang="ts">
	import { generateClassNames } from '@cluue/utils'
	import CellBase from './CellBase.svelte'
	import type { ComponentProps } from 'svelte'

	interface $$Props extends ComponentProps<CellBase> {
		class?: string
	}

	let className = ''
	export { className as class }
	CellBase
</script>

<CellBase class={generateClassNames(['CalendarCell', className])} {...$$restProps}>
	<slot />
</CellBase>

<style lang="sass">
    :global(.ClueCalendarCell)
        width: 40px
        height: 40px
</style>

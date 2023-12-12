<script lang="ts">
	import { generateClassNames } from '@cluue/utils'
	interface $$Props {
		class?: string
		tag?: string
		columns?: string
	}

	let className = ''
	export { className as class }
	export let tag: $$Props['tag'] = 'div'
	export let columns: $$Props['columns'] = undefined
</script>

<svelte:element this={tag} class={generateClassNames(['CalendarGridRow', className])} style:--columns={columns}>
	<slot />
</svelte:element>

<style lang="sass">
	.ClueCalendarGridRow
		--columns: repeat(auto-fit, minmax(0, 1fr))
		display: grid
		grid-template-columns: var(--columns)
		gap: 8px
		align-items: center
		justify-items: center
</style>

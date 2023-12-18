<script lang="ts">
	import { generateClassNames } from '@cluue/utils'
	interface $$Props {
		class?: string
		tag?: string
		columns?: string
		gap?: 'medium'
	}

	let className = ''
	export { className as class }
	export let tag: $$Props['tag'] = 'div'
	export let gap: $$Props['gap'] = undefined
	export let columns: $$Props['columns'] = undefined
</script>

<svelte:element this={tag} class={generateClassNames(['CalendarGridRow', className])} style:--columns={columns} data-gap={gap}>
	<slot />
</svelte:element>

<style lang="sass">
	.ClueCalendarGridRow
		--gap: 8px 12px
		--columns: repeat(auto-fit, minmax(0, 1fr))
		display: grid
		grid-template-columns: var(--columns)
		gap: var(--gap)
		align-items: center
		justify-items: center
		&[data-gap='medium']
			gap: 24px 12px
</style>

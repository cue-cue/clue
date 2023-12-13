<script lang="ts">
	import { generateClassNames } from '@cluue/utils'
	interface $$Props {
		class?: string
		tag?: string
	}

	let className = ''
	export { className as class }
	export let tag: $$Props['tag'] = 'div'
</script>

<svelte:element
	this={tag}
	class={generateClassNames(['CalendarGridCol', className])}
>
	<slot />
</svelte:element>

<style lang="sass">
	.ClueCalendarGridCol
		display: grid
		grid-template-columns: 1fr
		gap: 12px
</style>

<script lang="ts">
	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }
</script>

<button class={`CalendarCellBase ${className}`}>
	<slot />
</button>

<style lang="sass">
	.CalendarCellBase
</style>

<script lang="ts">
	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }
</script>

<div class={`GridRow ${className}`}>
	<slot />
</div>

<style lang="sass">
    .GridRow
        display: grid
        grid-template-columns: repeat(auto-fit, minmax(0, 1fr))
        gap: 8px
</style>

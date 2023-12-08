<script lang="ts">
	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }
</script>

<div class={`PickerContainer ${className}`}>
	<slot />
</div>

<style lang="sass">
    .PickerContainer
        padding-left: 20px
        padding-right: 20px
</style>

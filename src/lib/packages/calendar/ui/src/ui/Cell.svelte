<script lang="ts">
	import CellBase from './CellBase.svelte'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }
	CellBase
</script>

<CellBase class={`CalendarCell ${className}`}>
	<slot />
</CellBase>

<style lang="sass">
    .Cell
</style>

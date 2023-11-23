<svelte:options accessors />

<script lang="ts">
	import { generateClassNames } from '@cluue/utils'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }
</script>

<ul class={generateClassNames(['SelectOptionListBase', className])}>
	<slot />
</ul>

<style lang="sass">
	.ClueSelectOptionList
		background: var(--clue-color-white)
		border-radius: 0 0 10px 10px
		box-shadow: var(--clue-shadow)
		list-style: none
		padding: 12px
		overflow: auto
		:global(.ClueSelectOption)
			width: 100%
</style>

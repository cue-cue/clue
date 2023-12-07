<script lang="ts">
	import Checkbox from '../Checkbox/Checkbox.svelte'

	import { generateClassNames } from '@cluue/utils'

	interface $$Props {
		class?: string
		active?: boolean
	}

	let className = ''
	export { className as class }
	export let active: $$Props['active'] = false
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<li class={generateClassNames(['SelectOption', className])} data-clue-checkbox-field-hover-trigger data-clue-label-name-hover-trigger on:click on:dblclick>
	<Checkbox manual let:Label={LabelComponent} checked={active}>
		{#if $$slots.default}
			<svelte:component this={LabelComponent}>
				<slot />
			</svelte:component>
		{/if}
	</Checkbox>
	<!-- <span>
		{textContent}
	</span> -->
</li>

<style lang="sass">
	.ClueSelectOption
		margin: 0
		padding: 12px
		color: var(--clue-color-gray-600)
		display: flex
		align-items: center
		cursor: pointer
		border-radius: 10px
		transition: var(--clue-transition)
		transition-property: background
		&:hover
			background: var(--clue-color-primary-10)
		&:active
			background: var(--clue-color-primary-50)
</style>

<script lang="ts">
	import { generateClassNames } from '@cluue/utils'
	import { fieldContext } from '../FieldContext/index.js'
	import { writable } from 'svelte/store'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }

	const fieldContextData = fieldContext.get() || writable({})

	const handler = {
		click(e: MouseEvent) {
			if ($fieldContextData.manual) e.preventDefault()
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<label
	class={generateClassNames(['LabelName', className])}
	for={$fieldContextData.id}
	data-disabled={$fieldContextData.disabled}
	on:click={handler.click}
>
	<slot />
</label>

<style lang="sass">
	@import './LabelName'
	:global(body)
		+label-name-vars()
	.ClueLabelName
		cursor: pointer
		color: var(--clue-label-name-color)
		font-size: var(--clue-label-name-font-size)
		font-weight: var(--clue-label-name-font-weight)
		line-height: 125%
		transition: var(--clue-transition)
		transition-property: color
		&[data-disabled='true']
			cursor: not-allowed
			color: var(--clue-label-name-color-disabled)
		&:not([data-disabled='true'])
			@at-root :global([data-clue-label-name-hover-trigger]):hover &, &:hover
				color: var(--clue-label-name-color-hover)
</style>

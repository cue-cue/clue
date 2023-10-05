<script lang='ts'>
	import {generateClassNames} from '@clue/utils'
	import { fieldContext } from '../FieldContext/index.js'

	interface $$Props {
		class?:string
	}
	
	let className = ''
	export { className as class }

	const fieldContextData = fieldContext.get()
</script>

<label for={$fieldContextData.id} class={generateClassNames(['LabelName', className])} data-disabled={$fieldContextData.disabled}><slot/></label>

<style lang="sass">
	@import './LabelName'
	:global(:root)
		+label-name-vars()
	.ClueLabelName
		cursor: pointer
		color: var(--clue-label-name-color)
		font-size: var(--clue-label-name-font-size)
		font-weight: var(--clue-label-name-font-weight)
		line-height: 125%
		transition: var(--clue-transition)
		transition-property: color
		&[data-disabled]
			cursor: not-allowed
			color: var(--clue-label-name-color-disabled)
		&:not([data-disabled])
			@at-root :global(.ClueLabel__main):hover &, &:hover
				color: var(--clue-label-name-color-hover)
</style>
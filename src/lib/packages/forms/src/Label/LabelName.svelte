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
		color: var(--clue-checkbox-field-label-color)
		font-size: var(--clue-checkbox-field-label-font-size)
		font-weight: var(--clue-checkbox-field-label-font-weight)
		line-height: 125%
		transition: var(--clue-transition)
		transition-property: color
		&[data-disabled]
			cursor: not-allowed
			color: var(--clue-checkbox-field-label-color-disabled)
		&:not([data-disabled])
			@at-root :global(.ClueLabel__main):hover &, &:hover
				color: var(--clue-checkbox-field-label-color-hover)
</style>
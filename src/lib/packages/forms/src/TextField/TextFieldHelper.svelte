<script lang="ts">
	import { Icon } from '@cluue/icons'
	import errorIcon from '@cluue/icons/filled/exclamation-circle.svg?clue'
	import { generateClassNames } from '@cluue/utils'
	interface $$Props {
		class?: string
		error?: boolean
		disabled?: boolean
	}

	let className = ''
	export { className as class }
	export let error: $$Props['error'] = false
	export let disabled: $$Props['disabled'] = false
</script>

<div class={generateClassNames(['TextFieldHelper', className])} data-disabled={disabled} data-error={error}>
	{#if error}
		<Icon width={16} icon={errorIcon} />
	{/if}
	<span>
		<slot />
	</span>
</div>

<style lang="sass">
    .ClueTextFieldHelper
        font-weight: 400
        color: var(--clue-color-gray-700)
        font-size: 12px
        line-height: 150%
        transition: var(--clue-transition)
        transition-property: color
        vertical-align: middle
        display: flex
        &[data-disabled='true']
            color: var(--clue-color-txt-placeholder)
        &[data-error='true']
            color: var(--clue-color-negative-500)
        :global(.ClueIcon)
            --clue-icon-color: currentColor
            flex: none
            margin-right: 4px
            transition: none
</style>

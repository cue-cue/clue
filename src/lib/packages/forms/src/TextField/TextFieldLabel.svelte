<script lang="ts">
	import { generateClassNames } from '@cluue/utils'
	import type { HTMLLabelAttributes } from 'svelte/elements'
	import { context } from './context.js'
	interface $$Props extends HTMLLabelAttributes {
		class?: string
		color?: Vars.Colors
	}

	let className = ''
	export { className as class }
	export let color: $$Props['color'] = undefined
</script>

<label {...$$restProps} class={generateClassNames(['TextFieldLabel', className])} data-color={color}>
	<slot />
</label>

<style lang="sass">
    .ClueTextFieldLabel
        color: var(--clue-color-gray-700)
        font-weight: 500
        font-size: 12px
        line-height: 150%
        transition: var(--clue-transition)
        transition-property: color
        &[data-color='disabled']
            color: var(--clue-color-txt-placeholder)
</style>

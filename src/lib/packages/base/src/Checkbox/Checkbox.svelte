<script lang='ts'>
	import {generateClassNames} from '@clue/utils'
	import CheckboxBase from './CheckboxBase.svelte';
	import type { ComponentProps } from 'svelte';

	interface $$Props extends ComponentProps<CheckboxBase> {
		class?:string
		label?:string
	}
	
	let className = ''
	export { className as class }
	export let checked:$$Props['checked'] = false
	export let id:$$Props['id'] = undefined
	export let label:$$Props['label'] = undefined
	export let disabled:$$Props['disabled'] = undefined

	let checkboxBaseLabelRef:ComponentProps<CheckboxBase>['nodeElement'] = undefined
	
</script>

<div class={generateClassNames(['Checkbox', className])} data-disabled={disabled}>
	<div data-clue-checkbox-base-hover-trigger class={generateClassNames(['Checkbox__main', className])}>
		<CheckboxBase {disabled} bind:nodeElement={checkboxBaseLabelRef} bind:id bind:checked {...$$restProps}/>
		{#if label}
			<label for={id}>{label}</label>
		{/if}
	</div>
</div>

<style lang='sass'>
	.ClueCheckbox
		$root: &
		//label
		--clue-checkbox-label-gap: 8px
		--clue-checkbox-label-font-size: 16px
		--clue-checkbox-label-font-weight: 400
		--clue-checkbox-label-color: #484B5B
		--clue-checkbox-label-color-hover: #000
		--clue-checkbox-label-color-disabled: #B0B2C0
		&__main
			display: flex
			align-items: center
			pointer-events: none
			@at-root #{$root}:not([data-disabled]) &
				&:hover
					label
						color: var(--clue-checkbox-label-color-hover)
			:global(.ClueCheckboxBase), label
				pointer-events: auto
			label
				color: var(--clue-checkbox-label-color)
				font-size: var(--clue-checkbox-label-font-size)
				font-weight: var(--clue-checkbox-label-font-weight)
				line-height: 125%
				margin-left: var(--clue-checkbox-label-gap)
				transition: var(--transition)
				transition-property: color
				cursor: pointer
				@at-root #{$root}[data-disabled] &
					cursor: not-allowed
					color: var(--clue-checkbox-label-color-disabled)
</style>
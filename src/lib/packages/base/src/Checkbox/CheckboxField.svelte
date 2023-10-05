<script lang='ts'>
	import {generateClassNames} from '@clue/utils'
	import CheckboxBase from './CheckboxBase.svelte';
	import type { ComponentProps } from 'svelte';

	type T = $$Generic<'radio' | 'checkbox'>

	interface $$Props extends Omit<ComponentProps<CheckboxBase<T>>, 'type'> {
		class?:string
		type:T
	}
	
	let className = ''
	export { className as class }
	export let checked:$$Props['checked'] = undefined
	export let id:$$Props['id'] = undefined
	export let type:$$Props['type']
	export let disabled:$$Props['disabled'] = undefined
	export let value:$$Props['value'] = undefined
	export let group:$$Props['group'] = undefined
	
</script>

<div class={generateClassNames(['CheckboxField', className])} data-disabled={disabled}>
	<div data-clue-checkbox-base-hover-trigger class={generateClassNames(['Checkbox__main', className])}>
		<CheckboxBase {type} {disabled} bind:value bind:group bind:id bind:checked {...$$restProps}/>
		{#if $$slots.default}
			<label for={id}><slot/></label>
		{/if}
	</div>
</div>

<style lang='sass'>
	@import './Checkbox'
	:global(:root)
		+checkbox-vars()
	.ClueCheckbox
		$root: &
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
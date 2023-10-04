<script lang='ts'>
	import {generateClassNames, randomId} from '@clue/utils'
	import type { ComponentProps } from 'svelte';
	import CheckboxInput from './CheckboxInput.svelte';

	interface $$Props extends ComponentProps<CheckboxInput> {
		class?:string
		nodeElement?:HTMLLabelElement
	}
	
	let className = ''
	export { className as class }

	export let checked:$$Props['checked'] = false
	export let type:$$Props['type'] = 'checkbox'
	export let disabled:$$Props['disabled'] = undefined
	export let id:$$Props['id'] = randomId('checkbox')
	export let nodeElement:$$Props['nodeElement'] = undefined
	
</script>

<label bind:this={nodeElement} for={id} class={generateClassNames(['CheckboxBase', className])} data-checked={checked} data-disabled={disabled}>
	<CheckboxInput {id} {type} bind:checked {disabled} {...$$restProps}/>
</label>

<style lang='sass'>
	.ClueCheckboxBase
		$root: &
		--clue-checkbox-base-size: 20px
		--clue-checkbox-base-border-radius: 5px
		--clue-checkbox-base-border-width: 2px
		//border color
		--clue-checkbox-base-border-color: #B0B2C0
		--clue-checkbox-base-border-color-hover: #958AC7
		--clue-checkbox-base-border-color-disabled: #B0B2C0
		--clue-checkbox-base-border-color-checked: transparent
		--clue-checkbox-base-border-color-checked-hover: transparent
		--clue-checkbox-base-border-color-checked-disabled: transparent
		//background color
		--clue-checkbox-background-image: url("data:image/svg+xml,%3Csvg width='12' height='10' viewBox='0 0 12 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.2588 0.991227C11.4931 1.22564 11.6248 1.54352 11.6248 1.87498C11.6248 2.20643 11.4931 2.52432 11.2588 2.75873L5.00877 9.00873C4.77436 9.24307 4.45648 9.37471 4.12502 9.37471C3.79357 9.37471 3.47568 9.24307 3.24127 9.00873L0.741271 6.50873C0.513573 6.27297 0.38758 5.95722 0.390428 5.62948C0.393276 5.30173 0.524737 4.98821 0.756497 4.75645C0.988258 4.52469 1.30177 4.39323 1.62952 4.39038C1.95726 4.38754 2.27302 4.51353 2.50877 4.74123L4.12502 6.35748L9.49127 0.991227C9.72568 0.756889 10.0436 0.625244 10.375 0.625244C10.7065 0.625244 11.0244 0.756889 11.2588 0.991227Z' fill='white'/%3E%3C/svg%3E%0A")
		--clue-checkbox-background-color: #fff
		--clue-checkbox-background-color-hover: #fff
		--clue-checkbox-background-color-disabled: #fff
		--clue-checkbox-background-color-checked: #7567B6
		--clue-checkbox-background-color-checked-hover: #5B4C9F
		--clue-checkbox-background-color-checked-disabled: #B4ACD7

		display: inline-block
		width: var(--clue-checkbox-base-size)
		height: var(--clue-checkbox-base-size)
		flex: none
		cursor: pointer
		border-radius: var(--clue-checkbox-base-border-radius)
		background-color: var(--clue-checkbox-background-color)
		background-image: var(--clue-checkbox-background-image)
		background-repeat: no-repeat
		background-size: 12px 10px
		background-position: center center
		border-radius: var(--clue-checkbox-base-border-radius)
		border: var(--clue-checkbox-base-border-width) solid var(--clue-checkbox-base-border-color)
		transition: var(--clue-transition)
		transition-property: border, background, border-radius, width, height
		&[data-disabled]
			cursor: not-allowed
			border-color: var(--clue-checkbox-base-border-color-disabled)
		&:not(&[data-checked="true"], &[data-disabled])
			@at-root :global([data-clue-checkbox-base-hover-trigger]):hover &, &:hover
				border-color: var(--clue-checkbox-base-border-color-hover)
				background-color: var(--clue-checkbox-background-color-hover)
		&[data-checked="true"]
			&[data-disabled]
				background-color: var(--clue-checkbox-background-color-checked-disabled)
				border-color: var(--clue-checkbox-base-border-color-checked-disabled)
			&:not(&[data-disabled])
				background-color: var(--clue-checkbox-background-color-checked)
				border-color: var(--clue-checkbox-base-border-color-checked)
				&:hover
					border-color: var(--clue-checkbox-base-border-color-checked-hover)
					background-color: var(--clue-checkbox-background-color-checked-hover)
		:global(.ClueCheckboxInput)
			display: none
</style>
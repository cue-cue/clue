<script lang='ts'>
	import {generateClassNames} from '@clue/utils'
	import Input from '../Input/Input.svelte';
	import type { ComponentProps } from 'svelte';
	import { context } from './context.js';
	import { writable } from 'svelte/store';
	import TextFieldButtons from './TextFieldButtons.svelte';

	interface $$Props extends ComponentProps<Input> {
		class?:string
		error?:boolean
	}
	
	let className = ''
	export { className as class }
	export let error:$$Props['error'] = undefined
	export let disabled:$$Props['disabled'] = undefined

	const localContext = context.get() || writable()

</script>

<div
	class={generateClassNames(['TextFieldBase', className])}
	data-error={$localContext.error || error}
	data-disabled={$localContext.disabled || disabled}
	data-multiline={$$restProps.multiline}
	data-readonly={$$restProps.readonly}
>
	<slot>
		<Input
			disabled={$localContext.disabled || disabled}
			id={$localContext.id}
			{...$$restProps}
		/>
	</slot>
	<span class={generateClassNames(['TextFieldBase__border'])}></span>
	{#if $$slots.buttons}
		<TextFieldButtons><slot name='buttons'/></TextFieldButtons>
	{/if}
</div>

<style lang='sass'>
	@import './TextFieldBase'
	.ClueTextFieldBase
		$root: &
		+text-field-base-vars()
		--box-shadow-color: var(--text-field-base-border-color)
		--box-shadow-size: var(--text-field-base-border-width)
		--background-color: transparent
		--border-radius: var(--size-border-radius-3)
		display: flex
		position: relative
		width: auto
		min-height: var(--text-field-base-height)
		font-weight: 400
		font-size: var(--text-field-base-font-size)
		color: var(--text-field-base-color)
		background-color: var(--background-color)
		border-radius: var(--border-radius)
		transition: var(--transition)
		transition-property: background, border-radius
		&:not(&[data-disabled])
			&:hover
				--box-shadow-color: var(--text-field-base-border-color-hover)
			&[data-multiline]
				#{$root}__border
					box-shadow: none
		&[data-multiline]
			--background-color: var(--color-bg-secondary)
		&[data-readonly]
			--background-color: var(--color-bg-secondary)
			#{$root}__border
				box-shadow: none
		&[data-error]
			--box-shadow-color: var(--text-field-base-border-color-error)
			--box-shadow-size: var(--text-field-base-border-width-error)
		&[data-disabled]
			--box-shadow-size: var(--text-field-base-border-width-disabled)
			--box-shadow-color: var(--text-field-base-border-color-disabled)
			:global(.ClueInput), :global(.ClueTextFieldValue)
				color: var(--text-field-base-placeholder-color-disabled)
				--placeholder-color: var(--text-field-base-placeholder-color-disabled)
		&__border
			content: ''
			display: block
			position: absolute
			top: 0
			left: 0
			width: 100%
			height: 100%
			border-radius: var(--border-radius)
			box-shadow: inset 0 0 0 var(--box-shadow-size) var(--box-shadow-color)
			pointer-events: none
			transition: var(--transition)
			transition-property: box-shadow

		:global(.ClueInput:focus ~ #{$root}__border)
			--box-shadow-color: var(--text-field-base-border-color-focus)
			--box-shadow-size: var(--text-field-base-border-width-focus)

		:global(.ClueInput), :global(.ClueTextFieldValue)
			--placeholder-color: var(--text-field-base-placeholder-color)
			display: flex
			align-items: center
			border-radius: var(--border-radius)
			padding: var(--text-field-base-padding-y) var(--text-field-base-padding-x)
			font-size: inherit
			font-weight: inherit
			color: inherit
			min-height: 100%
			flex: 1
			width: 100%
			resize: none
			transition: var(--transition)
			transition-property: color
			&::placeholder
				transition: var(--transition)
				transition-property: color
				color: var(--placeholder-color)
		:global(.ClueInput[type='password'])
			letter-spacing: .18em
		&:not([data-disabled])
			:global(.ClueInput), :global(.ClueTextFieldValue)
				&:hover
					--placeholder-color: var(--text-field-base-placeholder-color-hover)
				&:focus
					--placeholder-color: var(--text-field-base-placeholder-color-focus)
		:global(.ClueTextFieldButtons)
			flex: none
			align-self: center
			margin-right: var(--text-field-base-padding-x)
</style>
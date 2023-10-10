<script lang='ts'>
	import {generateClassNames} from '@clue/utils'
	import Input from '../Input/Input.svelte';
	import type { ComponentProps } from 'svelte';
	import { context } from './context.js';
	import { writable } from 'svelte/store';
	import TextFieldButtons from './TextFieldButtons.svelte';
	import { actionList, type ActionListParams } from '$lib/packages/utils/src/actions/actionList.js'

	type InputTypes = Extract<ComponentProps<Input>['type'], 'password' | 'email' | 'text' | 'url' | 'tel'>

	interface $$Props extends Omit<ComponentProps<Input>, 'type'>, Partial<Record<`data-${string}`, string>> {
		class?:string
		error?:boolean
		type?:InputTypes
		focused?:boolean
		use?:ActionListParams
		nodeElement?:HTMLElement
	}

	
	let className = ''
	export { className as class }
	export let error:$$Props['error'] = undefined
	export let disabled:$$Props['disabled'] = undefined
	export let value:$$Props['value'] = ''
	export let type:$$Props['type'] = 'text'
	export let focused:$$Props['focused'] = undefined
	export let use:$$Props['use'] = undefined
	export let nodeElement:$$Props['nodeElement'] = undefined
	
	const localContext = context.get() || writable({})

	export const inputController:{
		clear:ComponentProps<Input>['clear']
		update:ComponentProps<Input>['update']
		set:ComponentProps<Input>['set']
	} = {
		clear: undefined,
		update: undefined,
		set: undefined,
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class={generateClassNames(['TextFieldBase', className])}
	data-error={$localContext?.error || error}
	data-disabled={$localContext?.disabled || disabled}
	data-multiline={$$restProps.multiline}
	data-readonly={$$restProps.readonly}
	data-focused={focused}
	bind:this={nodeElement}
	use:actionList={use}
	on:click
	on:dblclick
>
	<slot>
		<Input
			disabled={$localContext?.disabled || disabled}
			id={$localContext?.id}
			{type}
			on:focus
			on:blur
			bind:value
			bind:clear={inputController.clear}
			bind:update={inputController.update}
			bind:set={inputController.set}
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
	:global(body)
		+text-field-base-vars()
	.ClueTextFieldBase
		$root: &
		--box-shadow-color: var(--clue-text-field-base-border-color)
		--box-shadow-size: var(--clue-text-field-base-border-width)
		--background-color: var(--clue-text-field-base-background-color)
		--border-radius: var(--clue-text-field-base-border-radius)
		display: flex
		position: relative
		width: auto
		min-height: var(--clue-text-field-base-height)
		font-weight: var(--clue-text-field-base-font-weight)
		font-size: var(--clue-text-field-base-font-size)
		color: var(--clue-text-field-base-color)
		background-color: var(--background-color)
		border-radius: var(--border-radius)
		transition: var(--clue-transition)
		transition-property: background, border-radius
		&:not(&[data-disabled], &[data-readonly], &[data-error='true'])
			&:hover
				--box-shadow-color: var(--clue-text-field-base-border-color-hover)
			&[data-multiline]
				--box-shadow-size: var(--clue-text-field-base-textarea-border-width)
		&[data-multiline]
			--background-color: var(--clue-text-field-base-textarea-background-color)
		&[data-readonly]
			--background-color: var(--clue-text-field-base-background-color-readonly)
			--box-shadow-size: var(--clue-text-field-base-border-width-readonly)
		&[data-error]
			--box-shadow-color: var(--clue-text-field-base-border-color-error)
			--box-shadow-size: var(--clue-text-field-base-border-width-error)
		&[data-disabled]
			--box-shadow-size: var(--clue-text-field-base-border-width-disabled)
			--box-shadow-color: var(--clue-text-field-base-border-color-disabled)
			:global(.ClueInput), :global(.ClueTextFieldValue)
				color: var(--clue-text-field-base-placeholder-color-disabled)
				--placeholder-color: var(--clue-text-field-base-placeholder-color-disabled)
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
			transition: var(--clue-transition)
			transition-property: box-shadow, border-radius

		&:not(&[data-disabled])
			&[data-focused='true']
				--box-shadow-color: var(--clue-text-field-base-border-color-focus)
				--box-shadow-size: var(--clue-text-field-base-border-width-focus)
			:global(.ClueInput:focus ~ #{$root}__border)
				--box-shadow-color: var(--clue-text-field-base-border-color-focus)
				--box-shadow-size: var(--clue-text-field-base-border-width-focus)
		:global(.ClueInput), :global(.ClueTextFieldValue)
			--placeholder-color: var(--clue-text-field-base-placeholder-color)
			display: flex
			align-items: center
			border-radius: var(--border-radius)
			padding: var(--clue-text-field-base-padding-y) var(--clue-text-field-base-padding-x)
			font-size: inherit
			font-weight: inherit
			color: inherit
			min-height: 100%
			flex: 1
			width: 100%
			resize: none
			transition: var(--clue-transition)
			transition-property: color, border-radius
			&::placeholder
				transition: var(--clue-transition)
				transition-property: color
				color: var(--placeholder-color)
		:global(.ClueInput[type='password'])
			letter-spacing: .18em
		&:not(&[data-disabled], &[data-readonly])
			:global(.ClueInput), :global(.ClueTextFieldValue)
				&:hover
					--placeholder-color: var(--clue-text-field-base-placeholder-color-hover)
				&:focus
					--placeholder-color: var(--clue-text-field-base-placeholder-color-focus)
		:global(.ClueTextFieldButtons)
			flex: none
			align-self: center
			margin-right: var(--clue-text-field-base-padding-x)
</style>
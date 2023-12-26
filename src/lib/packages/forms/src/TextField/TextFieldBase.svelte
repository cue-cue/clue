<script lang="ts">
	import { generateClassNames, actionList, type ActionListParams } from '@cluue/utils'
	import Input from '../Input/Input.svelte'
	import type { ComponentProps } from 'svelte'
	import { context, textFieldBaseContext } from './context.js'
	import { writable } from 'svelte/store'
	import TextFieldButtons from './TextFieldButtons.svelte'

	type InputTypes = Extract<
		ComponentProps<Input>['type'],
		'password' | 'email' | 'text' | 'url' | 'tel'
	>

	interface $$Props
		extends Omit<ComponentProps<Input>, 'type' | 'size'>,
			Partial<Record<`data-${string}`, string>> {
		class?: string
		error?: boolean
		type?: InputTypes
		focused?: boolean
		use?: ActionListParams
		nodeElement?: HTMLElement
		slots?: Partial<Record<keyof typeof $$slots, boolean>>
		size?: 'small' | 'medium'
	}

	let className = ''
	export { className as class }
	export let error: $$Props['error'] = undefined
	export let disabled: $$Props['disabled'] = undefined
	export let value: $$Props['value'] = ''
	export let type: $$Props['type'] = 'text'
	export let focused: $$Props['focused'] = undefined
	export let use: $$Props['use'] = undefined
	export let nodeElement: $$Props['nodeElement'] = undefined
	export let size: $$Props['size'] = undefined
	export let slots: $$Props['slots'] = undefined

	const localContext = context.get() || writable({})

	export const inputController: {
		clear: ComponentProps<Input>['clear']
		update: ComponentProps<Input>['update']
		set: ComponentProps<Input>['set']
	} = {
		clear: undefined,
		update: undefined,
		set: undefined,
	}

	const textFieldBaseContextStore = textFieldBaseContext.set(writable({ size }))
	$: textFieldBaseContextStore.set({ size })
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
	data-size={size}
	bind:this={nodeElement}
	use:actionList={use}
	on:click
	on:dblclick
>
	{#if $$slots['buttons-start'] && (slots?.['buttons-start'] ?? true)}
		<TextFieldButtons
			class={generateClassNames(['TextFieldBase__buttons', 'TextFieldBase__buttons_start'])}
			><slot name="buttons-start" /></TextFieldButtons
		>
	{/if}
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
	<span class={generateClassNames(['TextFieldBase__border'])} />
	{#if $$slots.buttons && (slots?.buttons ?? true)}
		<TextFieldButtons
			class={generateClassNames(['TextFieldBase__buttons', 'TextFieldBase__buttons_end'])}
			><slot name="buttons" /></TextFieldButtons
		>
	{/if}
</div>

<style lang="sass">
	@import './TextFieldBase'
	:global(body)
		+text-field-base-vars()
	.ClueTextFieldBase
		$root: &
		--box-shadow-color: var(--clue-text-field-base-border-color)
		--box-shadow-size: var(--clue-text-field-base-border-width)
		--background-color: var(--clue-text-field-base-background-color)
		--border-radius: var(--clue-text-field-base-border-radius)
		--padding-y: var(--clue-text-field-base-padding-y)
		--padding-x: var(--clue-text-field-base-padding-x)
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
		&[data-size='small']
			min-height: var(--clue-text-field-base-s-small-height)
			--border-radius: var(--clue-text-field-base-s-small-border-radius)
			--padding-y: var(--clue-text-field-base-s-small-padding-y)
			--padding-x: var(--clue-text-field-base-s-small-padding-x)
			font-size: var(--clue-text-field-base-s-small-font-size)
		&:not(&[data-disabled='true'], &[data-readonly='true'], &[data-error='true'])
			&:hover
				--box-shadow-color: var(--clue-text-field-base-border-color-hover)
			&[data-multiline='true']
				--box-shadow-size: var(--clue-text-field-base-textarea-border-width)
		&[data-multiline='true']
			--background-color: var(--clue-text-field-base-textarea-background-color)
			:global(.ClueTextFieldBase__buttons)
				align-self: start
				margin-top: calc(var(--padding-y) - 2px)
		&[data-readonly='true']
			--background-color: var(--clue-text-field-base-background-color-readonly)
			--box-shadow-size: var(--clue-text-field-base-border-width-readonly)
		&[data-error='true']
			--box-shadow-color: var(--clue-text-field-base-border-color-error)
			--box-shadow-size: var(--clue-text-field-base-border-width-error)
		&[data-disabled='true']
			&:not(&[data-error='true'])
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

		&:not(&[data-disabled='true'])
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
			padding: var(--padding-y) var(--padding-x)
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
		&:not(&[data-disabled='true'], &[data-readonly='true'])
			:global(.ClueInput), :global(.ClueTextFieldValue)
				&:hover
					--placeholder-color: var(--clue-text-field-base-placeholder-color-hover)
				&:focus
					--placeholder-color: var(--clue-text-field-base-placeholder-color-focus)
	:global(.ClueTextFieldBase__buttons)
		flex: none
		align-self: center
	:global(.ClueTextFieldBase__buttons_start)
		margin-left: var(--padding-x)
	:global(.ClueTextFieldBase__buttons_start[data-hidden='true'])
		margin-left: 0
	:global(.ClueTextFieldBase__buttons_end)
		margin-right: var(--padding-x)
	:global(.ClueTextFieldBase__buttons_end[data-hidden='true'])
		margin-right: 0
</style>

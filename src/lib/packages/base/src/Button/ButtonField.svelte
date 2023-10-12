<script lang='ts'>
	import type { HTMLAnchorAttributes, HTMLBaseAttributes, HTMLButtonAttributes, HTMLLinkAttributes } from 'svelte/elements';

	import {generateClassNames} from '@clue/utils'

	interface $$Props extends Pick<HTMLAnchorAttributes, 'rel' | 'href' | 'tabindex' | 'target' | 'style'>, Record<`data-${string}`, string | undefined> {
		class?:string
		tag?:'button' | 'div' | 'a'
		disabled?:boolean
		type?:'action' | 'primary' | 'secondary' | 'ghost' | 'outlined'
	}

	let className = ''
	export { className as class }

	export let tag:$$Props['tag'] = 'button'
	export let disabled:$$Props['disabled'] = undefined
	export let type:$$Props['type'] = 'primary'

	$: disabledAttributes = tag === 'button' ? {
		disabled
	} : {
		['data-disabled']: disabled
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<svelte:element
	this={tag}
	class={generateClassNames(['ButtonField', className])}
	data-type={type}
	on:click
	on:dblclick
	on:mousedown
	on:mouseenter
	on:mouseleave
	on:mousemove
	on:mouseout
	on:mouseover
	on:mouseup
	on:contextmenu
	{...$$restProps}
	{...disabledAttributes}
>
	<slot/>
</svelte:element>

<style lang='sass'>
	@import './ButtonField'
	:global(body)
		+button-field-vars()
	.ClueButtonField
		// --clue-button-field-padding-x: 0
		// --clue-button-field-padding-y: 0
		// --clue-button-field-border-radius: 50px
		+button-field-type-apply()

		outline: none
		appearance: none
		border: 1px solid var(--border-color)
		border-radius: var(--clue-button-field-border-radius, 50px)
		padding: var(--clue-button-field-padding-y, 0) var(--clue-button-field-padding-x, 0)
		background-color: var(--background-color)
		color: var(--color)
		transition: var(--clue-transition)
		transition-property: color, background, width, height, padding, border, box-shadow
		@at-root button#{&}, a#{&}
			cursor: pointer
		&:not(&[data-disabled='true'], &[disabled])
			&:hover
				background-color: var(--background-color-hover)
				color: var(--color-hover)
				border-color: var(--border-color-hover)
			&:active
				background-color: var(--background-color-active)
				color: var(--color-active)
				border-color: var(--border-color-active)
		&[disabled], &[data-disabled='true']
			cursor: not-allowed
			background-color: var(--background-color-disabled)
			color: var(--color-disabled)
			border-color: var(--border-color-disabled)
		@each $type in 'action', 'secondary', 'ghost', 'outlined'
			&[data-type='#{$type}']
				+button-field-type-apply('#{$type}')
</style>
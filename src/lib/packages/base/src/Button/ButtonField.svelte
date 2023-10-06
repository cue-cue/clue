<script lang='ts'>
	import type { HTMLAnchorAttributes, HTMLBaseAttributes, HTMLButtonAttributes, HTMLLinkAttributes } from 'svelte/elements';

	import {generateClassNames} from '@clue/utils'

	interface $$Props extends Pick<HTMLAnchorAttributes, 'rel' | 'href' | 'tabindex' | 'target' | 'style'>, Record<`data-${string}`, string | undefined> {
		class?:string
		tag?:'button' | 'div' | 'a'
		disabled?:boolean
		color?:'action' | 'primary' | 'secondary'
		variant?:'filled' | 'ghost' | 'outlined'
	}

	let className = ''
	export { className as class }

	export let tag:$$Props['tag'] = 'button'
	export let disabled:$$Props['disabled'] = undefined
	export let color:$$Props['color'] = 'primary'
	export let variant:$$Props['variant'] = 'filled'

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
	data-color={color}
	data-variant={variant}
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
	:global(:root)
		+button-field-vars()
	.ClueButtonField
		// --clue-button-field-padding-x: 0
		// --clue-button-field-padding-y: 0
		// --clue-button-field-border-radius: 50px
		//background color
		--background-color: var(--clue-button-field-background-color)
		--background-color-hover: var(--clue-button-field-background-color-hover)
		--background-color-active: var(--clue-button-field-background-color-active)
		--background-color-disabled: var(--clue-button-field-background-color-disabled)
		//ghost
		--v-ghost-background-color-hover: var(--clue-button-field-background-color-hover)
		--v-ghost-background-color-active: var(--clue-button-field-background-color-active)

		//color
		--color: var(--clue-button-field-color)
		--color-hover: var(--clue-button-field-color-hover)
		--color-active: var(--clue-button-field-color-active)
		--color-disabled: var(--clue-button-field-color-disabled)
		//ghost
		--v-ghost-color: var(--clue-button-field-color)
		--v-ghost-color-hover: var(--clue-button-field-color-hover)
		--v-ghost-color-active: var(--clue-button-field-color-active)

		//border-color
		--border-color: var(--clue-button-field-border-color)
		--border-color-hover: var(--clue-button-field-border-color-hover)
		--border-color-active: var(--clue-button-field-border-color-active)
		--border-color-disabled: var(--clue-button-field-border-color-disabled)
		--border-color-current: var(--border-color)
		
		//border width
		--border-width: 1px
		--border-width-disabled: 0
		--border-width-current: var(--border-width)
		
		outline: none
		appearance: none
		border: none
		border-radius: var(--clue-button-field-border-radius, 50px)
		padding: var(--clue-button-field-padding-y, 0) var(--clue-button-field-padding-x, 0)
		background-color: var(--background-color)
		color: var(--color)
		transition: var(--clue-transition)
		transition-property: color, background, width, height, padding, border, box-shadow
		@at-root button#{&}, a#{&}
			cursor: pointer
		&:not(&[data-disabled], &[disabled])
			&:hover
				background-color: var(--background-color-hover)
				color: var(--color-hover)
				--border-color-current: var(--border-color-hover)
			&:active
				background-color: var(--background-color-active)
				color: var(--color-active)
				--border-color-current: var(--border-color-active)
		&[disabled], &[data-disabled]
			cursor: not-allowed
			background-color: var(--background-color-disabled)
			color: var(--color-disabled)
			--border-color-current: var(--border-color-disabled)
		&[data-color='action']
			+button-field-apply-color-vars('action')
		&[data-color='secondary']
			+button-field-apply-color-vars('secondary')
		&[data-variant='ghost']
			//background
			--background-color: transparent
			--background-color-hover: var(--v-ghost-background-color-active)
			--background-color-active: var(--v-ghost-background-color-active)
			--background-color-disabled: transparent

			//color
			--color: var(--v-ghost-color)
			--color-hover: var(--v-ghost-color-hover)
			--color-active: var(--v-ghost-color-active)
		&[data-variant='outlined']
			box-shadow: inset 0 0 0 var(--border-width-current) var(--border-color-current)
			//background
			--background-color: var(--v-outlined-background-color)
			--background-color-hover: var(--v-outlined-background-color-active)
			--background-color-active: var(--v-outlined-background-color-active)
			--background-color-disabled: var(--v-outlined-background-color-disabled)

			//color
			--color: var(--v-outlined-color)
			--color-hover: var(--v-outlined-color-hover)
			--color-active: var(--v-outlined-color-active)
</style>
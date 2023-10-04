<script lang='ts'>
	import type { HTMLAnchorAttributes, HTMLBaseAttributes, HTMLButtonAttributes, HTMLLinkAttributes } from 'svelte/elements';

	import {generateClassNames} from '@clue/utils'

	interface $$Props extends Pick<HTMLAnchorAttributes, 'rel' | 'href' | 'tabindex' | 'target' | 'style'>, Record<`data-${string}`, string | undefined> {
		class?:string
		tag?:'button' | 'div' | 'a'
		disabled?:boolean
		color?:'action' | 'primary' | 'secondary' | 'ghost'
		variant?:'filled' | 'outlined'
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
	.ClueButtonField
		// --clue-button-field-padding-x: 0
		// --clue-button-field-padding-y: 0
		// --clue-button-field-border-radius: 50px
		//background color
		--clue-button-field-background-color: #5B4C9F
		--clue-button-field-background-color-hover: #473B7C
		--clue-button-field-background-color-active: #4F428A
		--clue-button-field-background-color-disabled: #E8E9ED
		//color
		--clue-button-field-color: #EFEEF7
		--clue-button-field-color-hover: #EFEEF7
		--clue-button-field-color-active: #EFEEF7
		--clue-button-field-color-disabled: #B0B2C0
		//border color
		--clue-button-border-color: transparent
		--clue-button-border-color-hover: transparent
		--clue-button-border-color-active: transparent
		--clue-button-border-color-disabled: transparent
		--clue-button-border-color-current: var(--clue-button-border-color)
		//border width
		--clue-button-border-width: 1px
		--clue-button-border-width-disabled: 0
		--clue-button-border-width-current: var(--clue-button-border-width)
		
		outline: none
		appearance: none
		border: none
		border-radius: var(--clue-button-field-border-radius, 50px)
		padding: var(--clue-button-field-padding-y, 0) var(--clue-button-field-padding-x, 0)
		background-color: var(--clue-button-field-background-color)
		color: var(--clue-button-field-color)
		box-shadow: inset 0 0 0 var(--clue-button-border-width-current) var(--clue-button-border-color-current)
		transition: var(--clue-transition)
		transition-property: color, background, width, height, padding, border, box-shadow
		@at-root button#{&}, a#{&}
			cursor: pointer
		&:not(&[data-disabled], &[disabled])
			&:hover
				background-color: var(--clue-button-field-background-color-hover)
				color: var(--clue-button-field-color-hover)
				--clue-button-border-color-current: var(--clue-button-border-color-hover)
			&:active
				background-color: var(--clue-button-field-background-color-active)
				color: var(--clue-button-field-color-active)
				--clue-button-border-color-current: var(--clue-button-border-color-active)
		&[disabled], &[data-disabled]
			cursor: not-allowed
			background-color: var(--clue-button-field-background-color-disabled)
			color: var(--clue-button-field-color-disabled)
			--clue-button-border-color-current: var(--clue-button-border-color-disabled)
		&[data-color='action']
			--clue-button-field-background-color: #EECD47
			--clue-button-field-background-color-hover: #EAC11A
			--clue-button-field-background-color-active: #EAC11A
			--clue-button-field-color: #1B1C22
			--clue-button-field-color-hover: #1B1C22
			--clue-button-field-color-active: #1B1C22
		&[data-color='secondary']
			--clue-button-field-background-color: #E6E3F2
			--clue-button-field-background-color-hover: #DDD9ED
			--clue-button-field-background-color-active: #DDD9ED
			--clue-button-field-color: #5B4C9F
			--clue-button-field-color-hover: #5B4C9F
			--clue-button-field-color-active: #5B4C9F
		&[data-color='ghost']
			--clue-button-field-background-color: transparent
			--clue-button-field-background-color-hover: #EFEEF7
			--clue-button-field-background-color-active: #EFEEF7
			--clue-button-field-background-color-disabled: transparent
			--clue-button-field-color: #5B4C9F
			--clue-button-field-color-hover: #5B4C9F
			--clue-button-field-color-active: #5B4C9F
		&[data-variant='outlined']
			--clue-button-border-color: #D3CFE8
			--clue-button-border-color-hover: #D3CFE8
			--clue-button-border-color-active: #D3CFE8
</style>
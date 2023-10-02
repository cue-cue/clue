<script lang='ts'>
	import type { HTMLAnchorAttributes, HTMLBaseAttributes, HTMLButtonAttributes, HTMLLinkAttributes } from 'svelte/elements';

	import {generateClassNames} from '@clue/utils'

	interface $$Props extends Pick<HTMLAnchorAttributes, 'rel' | 'href' | 'tabindex' | 'target' | 'style'>, Record<`data-${string}`, string | undefined> {
		class?:string
		tag?:'button' | 'div' | 'a'
		disabled?:boolean
	}

	let className = ''
	export { className as class }

	export let tag:$$Props['tag'] = 'button'
	export let disabled:$$Props['disabled'] = undefined

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
		--clue-button-field-background-color: #5B4C9F
		--clue-button-field-background-color-hover: #473B7C
		--clue-button-field-background-color-active: #332B5A
		--clue-button-field-background-color-disabled: #D3CFE8
		--clue-button-field-color: #fff
		--clue-button-field-color-hover: #fff
		--clue-button-field-color-active: #fff
		--clue-button-field-color-disabled: #958AC7
		outline: none
		appearance: none
		border: none
		border-radius: var(--clue-button-field-border-radius, 50px)
		padding: var(--clue-button-field-padding-y, 0) var(--clue-button-field-padding-x, 0)
		background-color: var(--clue-button-field-background-color)
		color: var(--clue-button-field-color)
		transition: var(--transition)
		transition-property: color, background, width, height, padding, border
		@at-root button#{&}, a#{&}
			cursor: pointer
		&:hover
			background-color: var(--clue-button-field-background-color-hover)
			color: var(--clue-button-field-color-hover)
		&:active
			background-color: var(--clue-button-field-background-color-active)
			color: var(--clue-button-field-color-active)
</style>
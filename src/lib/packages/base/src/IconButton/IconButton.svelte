<script lang='ts'>
	import {generateClassNames} from '@clue/utils'
	import ButtonField from '../Button/ButtonField.svelte';
	import { Icon } from '@clue/icons';
	import type { ComponentProps } from 'svelte';
	import type { HTMLLinkAttributes } from 'svelte/elements';

	interface $$Props extends Omit<ComponentProps<ButtonField>, 'tag'> {
		class?:string
		href?:HTMLLinkAttributes['href']
		icon:ComponentProps<Icon>['icon']
		size?:'small' | 'medium' | 'large'
	}
	
	let className = ''
	export { className as class }

	export let href:$$Props['href'] = undefined
	export let size:$$Props['size'] = 'medium'
	export let icon:$$Props['icon']
</script>

<ButtonField
	tag={href ? 'a' : 'button'}
	class={generateClassNames(['IconButton', className])}
	data-size={size}
	{href}
	{...$$restProps}
>
	<Icon {icon}/>
</ButtonField>

<style lang='sass'>
	@import './IconButton'
	:global(body)
		+icon-button-vars()
		
	:global(.ClueIconButton)
		--size: var(--clue-icon-button-size)
		--icon-size: var(--clue-icon-button-icon-size)
		display: inline-flex
		align-items: center
		justify-content: center
		flex: none
		width: var(--size)
		height: var(--size)
		:global(.ClueIcon)
			--clue-icon-color: currentColor
			width: var(--icon-size)
			height: var(--icon-size)
	:global(.ClueIconButton[data-size='large'])
		--size: var(--clue-icon-button-size-large)
		--icon-size: var(--clue-icon-button-icon-size-large)
	:global(.ClueIconButton[data-size='small'])
		--size: var(--clue-icon-button-size-small)
		--icon-size: var(--clue-icon-button-icon-size-small)
	:global(.ClueIconButton[data-color='primary'])
		--clue-button-field-background-color-disabled: var(--clue-icon-button-background-color-disabled-primary)
		--clue-button-field-color-disabled: var(--clue-icon-button-color-disabled-primary)
</style>
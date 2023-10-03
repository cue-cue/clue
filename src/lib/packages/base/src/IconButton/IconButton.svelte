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
	:global(.ClueIconButton)
		--clue-icon-size: 48px
		--clue-icon-button-icon-size: 24px
		display: inline-flex
		align-items: center
		justify-content: center
		flex: none
		width: var(--clue-icon-size)
		height: var(--clue-icon-size)
		:global(.ClueIcon)
			--clue-icon-color: currentColor
			width: var(--clue-icon-button-icon-size)
			height: var(--clue-icon-button-icon-size)
	:global(.ClueIconButton[data-size='large'])
		--clue-icon-size: 56px
	:global(.ClueIconButton[data-size='small'])
		--clue-icon-size: 40px
		--clue-icon-button-icon-size: 20px
	:global(.ClueIconButton[data-color='primary'])
		--clue-button-field-background-color-disabled: #D3CFE8
		--clue-button-field-color-disabled: #958AC7
</style>
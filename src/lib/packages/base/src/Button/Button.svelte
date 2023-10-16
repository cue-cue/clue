<script lang='ts'>
    import {generateClassNames} from '@clue/utils'
	import ButtonField from './ButtonField.svelte';
	import type { ComponentProps } from 'svelte';
	import ButtonIcon from './ButtonIcon.svelte';
	import type { HTMLLinkAttributes } from 'svelte/elements';

    interface $$Props extends Omit<ComponentProps<ButtonField>, 'tag'> {
        class?:string
        href?:HTMLLinkAttributes['href']
        startIcon?:ComponentProps<ButtonIcon>['icon']
        endIcon?:ComponentProps<ButtonIcon>['icon']
        size?:'small' | 'medium' | 'large'
    }
    
    let className = ''
    export { className as class }

    export let href:$$Props['href'] = undefined
    export let startIcon:$$Props['startIcon'] = undefined
    export let endIcon:$$Props['endIcon'] = undefined
    export let size:$$Props['size'] = undefined
</script>

<ButtonField
    class={generateClassNames(['Button', className])}
    tag={href ? 'a' : 'button'}
    {href}
    data-size={size}
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
>
    {#if startIcon}
        <ButtonIcon icon={startIcon} class={generateClassNames(['Button__icon_start'])}/>
    {/if}
    <span><slot/></span>
    {#if endIcon}
        <ButtonIcon icon={endIcon} class={generateClassNames(['Button__icon_end'])}/>
    {/if}
</ButtonField>

<style lang='sass'>
    @import './Button'
    :global(body)
        +button-vars()
    :global(.ClueButton)
        --clue-button-field-padding-x: var(--clue-button-padding-x)
        --clue-button-field-padding-y: var(--clue-button-padding-y)
        --clue-button-field-border-radius: var(--clue-button-border-radius)
        display: inline-flex
        text-align: center
        align-items: center
        justify-content: center
        text-decoration: none
        line-height: var(--clue-button-icon-size)
        font-weight: var(--clue-button-font-weight)
        font-size: var(--clue-button-font-size)
        :global(.ClueButtonIcon)
            flex: none
            width: var(--clue-button-icon-size)
            height: var(--clue-button-icon-size)
    :global(.ClueButton[data-size='small'])
        +button-apply-size-vars('small')
    :global(.ClueButton[data-size='large'])
        +button-apply-size-vars('large')
    :global(.ClueButton__icon_start)
        margin-right: var(--clue-button-gap)
    :global(.ClueButton__icon_end)
        margin-left: var(--clue-button-gap)
</style>
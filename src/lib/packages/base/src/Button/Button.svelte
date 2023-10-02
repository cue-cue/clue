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

    $: tag = (href ? 'a' : 'button') as ComponentProps<ButtonField>['tag']

</script>

<ButtonField
    class={generateClassNames(['Button', className])}
    {tag}
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
    :global(.ClueButton)
        --clue-button-field-padding-x: 16px
        --clue-button-field-padding-y: 12px
        --clue-button-field-border-radius: 50px
        --clue-button-font-size: 16px
        --clue-button-min-width: 155px
        --clue-button-gap: 12px
        --clue-button-icon-size: 24px
        display: inline-flex
        text-align: center
        align-items: center
        justify-content: center
        text-decoration: none
        min-width: var(--clue-button-min-width)
        line-height: 150%
        font-weight: 500
        font-size: var(--clue-button-font-size)
        span
            margin-left: var(--clue-button-gap)
            margin-right: var(--clue-button-gap)
        :global(.ClueButtonIcon)
            flex: none
    :global(.ClueButton__icon_start)
        margin-left: calc(var(--clue-button-icon-size) * -1)
    :global(.ClueButton__icon_end)
        margin-right: calc(var(--clue-button-icon-size) * -1)
</style>
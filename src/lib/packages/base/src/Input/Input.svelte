<script lang='ts'>
    import {generateClassNames} from '@clue/utils'
	import type { HTMLInputAttributes, HTMLTextareaAttributes } from "svelte/elements";

    interface $$Props extends HTMLInputAttributes, Pick<HTMLTextareaAttributes, 'maxlength' | 'rows'> {
        class?:string
        multiline?:boolean
    }
    
    let className = ''
    export { className as class }
    export let multiline:$$Props['multiline'] = false
    
</script>

<svelte:element this={multiline ? 'textarea' : 'input'} class={generateClassNames(['Input', className])} {...$$restProps}/>

<style lang='sass'>
    @import './Input'
    .ClueInput
        +input-vars()
        resize: none
        border: none
        outline: none
        appearance: none
        background: none
        transition: var(--transition)
        transition-property: color
        &:hover
            &::placeholder
                color: var(--input-placeholder-color-hover)
        &:focus
            &::placeholder
                color: var(--input-placeholder-color-focus)
        &::placeholder
            transition: var(--transition)
            transition-property: color
            color: var(--input-placeholder-color)
</style>
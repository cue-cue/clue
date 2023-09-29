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

<svelte:element
    this={multiline ? 'textarea' : 'input'}
    class={generateClassNames(['Input', className])}
    {...$$restProps}
/>

<style lang='sass'>
    .ClueInput
        border: none
        outline: none
        appearance: none
        background: none
        padding: 0
        margin: 0
</style>
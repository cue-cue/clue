<script lang='ts'>
    import {generateClassNames} from '@clue/utils'
	import type { ComponentProps } from 'svelte';
	import InputTextareaElement from './InputTextareaElement.svelte';
	import InputElement from './InputElement.svelte';

    interface $$Props extends ComponentProps<InputElement>, Pick<ComponentProps<InputTextareaElement>, 'maxlength' | 'rows'> {
        class?:string
        multiline?:boolean
    }
    
    let className = ''
    export { className as class }
    
    export let value:$$Props['value'] = ''
    export let multiline:$$Props['multiline'] = false

    const elementsMap = new Map<typeof multiline, typeof InputElement | typeof InputTextareaElement>([
        [false, InputElement],
        [true, InputTextareaElement],
    ])

    
    export const set = (newValue:typeof value) => {
        value = newValue
    }

    export const update = (callback:(currentValue:typeof value) => typeof value) => {
        set(callback(value))
    }

    export const clear = () => {
        value = ''
    }
    
</script>

<svelte:component
    this={elementsMap.get(multiline)}
    class={generateClassNames(['Input', className])}
    on:input
    on:change
    on:keydown
    on:keyup
    on:click
    on:focus
    on:blur
    bind:value
    {...$$restProps}
/>

<style lang='sass'>
    :global(.ClueInput)
        border: none
        outline: none
        appearance: none
        background: none
        padding: 0
        margin: 0
</style>
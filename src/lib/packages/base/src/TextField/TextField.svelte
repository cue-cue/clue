<script lang='ts'>
    import {generateClassNames, randomId} from '@clue/utils'
	import TextFieldBase from './TextFieldBase.svelte';
	import TextFieldHelper from './TextFieldHelper.svelte';
    import TextFieldHeader from './TextFieldHeader.svelte'
	import TextFieldLabel from './TextFieldLabel.svelte';
	import TextFieldValue from './TextFieldValue.svelte';
	import type { ComponentProps } from 'svelte';
	import TextFieldFooter from './TextFieldFooter.svelte';
	import { context } from './context.js';
	import { writable } from 'svelte/store';
	import TextFieldHint from './TextFieldHint.svelte';

    interface $$Props extends ComponentProps<TextFieldBase> {
        class?:string
        label?:string
        hint?:string
        helper?:string
    }

    interface $$Slots {
        base: {
            id: $$Props['id']
        },
        default: {
            id: $$Props['id']
        }
    }
    
    let className = ''
    export { className as class }

    export let label:$$Props['label'] = undefined
    export let hint:$$Props['hint'] = undefined
    export let helper:$$Props['helper'] = undefined
	export let id:$$Props['id'] = randomId('input')
    export let error:$$Props['error'] = undefined
    export let disabled:$$Props['disabled'] = undefined

    const localContext = context.set(writable({
        error,
        disabled,
        id
    }))

    $: localContext.set({
        error,
        disabled,
        id
    })
    
</script>

<div
    class={generateClassNames(['TextField', className])}
    data-error={error}
    data-disabled={disabled}
>
    {#if label || hint}
        <TextFieldHeader>
            {#if label}
                <TextFieldLabel for={id} color={disabled ? 'disabled' : undefined}>
                    {label}
                </TextFieldLabel>
            {/if}
            {#if hint}
                <TextFieldHint>
                    {hint}
                </TextFieldHint>
            {/if}
        </TextFieldHeader>
    {/if}
    <slot name='base' {id}>
        {#if $$slots.default}
            <TextFieldBase {...$$restProps}><TextFieldValue><slot {id}/></TextFieldValue></TextFieldBase>
        {:else}
            <TextFieldBase {...$$restProps}></TextFieldBase>
        {/if}
    </slot>
    {#if helper}
        <TextFieldFooter>
            {#if helper}
                <TextFieldHelper color={error ? 'error' : disabled ? 'disabled' : undefined}>
                    {helper}
                </TextFieldHelper>
            {/if}
        </TextFieldFooter>
    {/if}
</div>

<style lang='sass'>
    .ClueTextField
        :global(.ClueTextFieldHeader)
            margin-bottom: 4px
        :global(.ClueTextFieldFooter)
            margin-top: 4px
</style>
<script lang='ts'>
    import {generateClassNames, randomId} from '@cluue/utils'
	import TextFieldBase from './TextFieldBase.svelte';
	import TextFieldHelper from './TextFieldHelper.svelte';
    import TextFieldHeader from './TextFieldHeader.svelte'
	import TextFieldLabel from './TextFieldLabel.svelte';
	import type { ComponentProps } from 'svelte';
	import TextFieldFooter from './TextFieldFooter.svelte';
	import { context } from './context.js';
	import { writable } from 'svelte/store';
	import TextFieldHint from './TextFieldHint.svelte';
	import { actionList, type ActionListParams } from '$lib/packages/utils/src/actions/actionList'

    interface $$Props extends Omit<ComponentProps<TextFieldBase>, 'slots'> {
        class?:string
        label?:string
        hint?:string
        helper?:string
        use?:ActionListParams
    }

    interface $$Slots {
        base: {
            id: $$Props['id']
        },
        default: {
            id: $$Props['id']
        }
        buttons: {}
        'buttons-start': {}
    }
    
    let className = ''
    export { className as class }

    export let label:$$Props['label'] = undefined
    export let hint:$$Props['hint'] = undefined
    export let helper:$$Props['helper'] = undefined
	export let id:$$Props['id'] = randomId('input')
    export let error:$$Props['error'] = undefined
    export let disabled:$$Props['disabled'] = undefined
    export let value:$$Props['value'] = ''
    export let use:$$Props['use'] = undefined

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
    use:actionList={use}
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
        <TextFieldBase
            bind:value
            {...$$restProps}
            slots={{
                buttons: $$slots.buttons ?? false,
                'buttons-start': $$slots['buttons-start'] ?? false
            }}
        >
            <svelte:fragment slot='buttons-start'>
                <slot name='buttons-start'/>
            </svelte:fragment>
            <svelte:fragment slot='buttons'>
                <slot name='buttons'/>
            </svelte:fragment>
        </TextFieldBase>
    </slot>
    {#if helper}
        <TextFieldFooter>
            {#if helper}
                <TextFieldHelper {error} {disabled} >
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
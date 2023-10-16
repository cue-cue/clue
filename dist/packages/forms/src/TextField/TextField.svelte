<script>import { generateClassNames, randomId } from "@cluue/utils";
import TextFieldBase from "./TextFieldBase.svelte";
import TextFieldHelper from "./TextFieldHelper.svelte";
import TextFieldHeader from "./TextFieldHeader.svelte";
import TextFieldLabel from "./TextFieldLabel.svelte";
import TextFieldFooter from "./TextFieldFooter.svelte";
import { context } from "./context.js";
import { writable } from "svelte/store";
import TextFieldHint from "./TextFieldHint.svelte";
import { actionList } from "../../../utils/src/actions/actionList";
let className = "";
export { className as class };
export let label = void 0;
export let hint = void 0;
export let helper = void 0;
export let id = randomId("input");
export let error = void 0;
export let disabled = void 0;
export let value = "";
export let use = void 0;
const localContext = context.set(writable({
  error,
  disabled,
  id
}));
$:
  localContext.set({
    error,
    disabled,
    id
  });
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

<style>.ClueTextField :global(.ClueTextFieldHeader) {
  margin-bottom: 4px;
}
.ClueTextField :global(.ClueTextFieldFooter) {
  margin-top: 4px;
}</style>
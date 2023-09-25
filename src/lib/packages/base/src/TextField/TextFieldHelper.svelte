<script lang='ts'>
    import {generateClassNames} from '@clue/utils'
    interface $$Props {
        class?:string
        color?:Vars.Colors
    }
    
    let className = ''
    export { className as class }
    export let color:$$Props['color'] = undefined
</script>

<span class={generateClassNames(['TextFieldHelper', className])} data-color={color}>
    <slot></slot>
</span>

<style lang='sass'>
    .ClueTextFieldHelper
        font-weight: 400
        color: #484B5B
        font-size: 12px
        line-height: 150%
        transition: var(--transition)
        transition-property: color
        &[data-color='error']
            color: #D15A45
        &[data-color='disabled']
            color: var(--color-txt-placeholder)
</style>
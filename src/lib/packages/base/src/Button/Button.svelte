<script lang='ts'>
    import {generateClassNames} from '@clue/utils'
    interface $$Props {
        class?:string
        content?:string
    }
    
    let className = ''
    export { className as class }
    export let content:$$Props['content'] = ''
</script>

<button class={generateClassNames(['Button', className])}>
    <slot>{content}</slot>
</button>

<style>
    .ClueButton {
    }
</style>
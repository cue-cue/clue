<script lang='ts'>
    import {generateClassNames} from '@clue/utils'

    interface $$Props {
        class?:string
    }
    
    let className = ''
    export { className as class }
    
</script>

<div class={generateClassNames(['TextField', className])}>
</div>

<style lang='sass'>
    .ClueTextField
</style>
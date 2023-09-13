<script lang='ts'>
    import {generateClassNames} from '@clue/utils'
	import TextFieldBase from './TextFieldBase.svelte';
	import type { ComponentProps } from 'svelte';

    interface $$Props extends ComponentProps<TextFieldBase> {
        class?:string
    }
    
    let className = ''
    export { className as class }
    
</script>

<div class={generateClassNames(['TextField', className])}>
    <TextFieldBase {...$$restProps}/>
</div>

<style lang='sass'>
    .ClueTextField
</style>
<script lang='ts'>
	import {Icon} from "@cluue/icons"
	import arrowIcon from "@cluue/icons/line/arrow-left.svg?clue"

    interface $$Props {
        class?:string
        type?: 'prev' | 'next'
    }
    
    let className = ''
    export { className as class }
    export let type:$$Props['type'] = 'prev'
    
</script>

<button class={`PickerNavigatorArrow ${className}`} data-type={type}>
    <Icon width={20} icon={arrowIcon}/>
</button>

<style lang='sass'>
    .PickerNavigatorArrow
        border: none
        background: none
        cursor: pointer
        &[data-type='next']
            transform: scaleX(-1)
</style>
<script lang='ts'>
	import PickerNavigatorArrow from "./PickerNavigatorArrow.svelte"

    interface $$Props {
        class?:string
    }
    
    let className = ''
    export { className as class }
    
</script>

<div class={`PickerNavigator ${className}`}>
    <PickerNavigatorArrow/>
    <PickerNavigatorArrow type='next'/>
</div>

<style lang='sass'>
    .PickerNavigator
        display: flex
        align-items: center
        justify-content: space-between
        padding: 8px 10px
</style>
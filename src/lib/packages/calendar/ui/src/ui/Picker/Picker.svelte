<script lang='ts'>
	import PickerDays from "./PickerDays.svelte"
    import PickerNavigator from "./PickerNavigator.svelte"
    import PickerContainer from "./PickerContainer.svelte"

    interface $$Props {
        class?:string
    }
    
    let className = ''
    export { className as class }
</script>

<div class={`Picker ${className}`}>
    <PickerContainer>
        <PickerNavigator/>
        <PickerDays/>
    </PickerContainer>
</div>

<style lang='sass'>
    .Picker
        background: var(--clue-color-white)
        box-shadow: 2px 2px 12px 4px rgba(0, 0, 0, .16)
        padding: 10px 0 20px 0
        border-radius: 20px
        :global(.PickerDays)
            width: 100%
</style>
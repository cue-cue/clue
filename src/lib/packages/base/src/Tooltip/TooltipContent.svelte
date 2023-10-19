<script lang='ts'>
	import PopoverContent from "$lib/packages/popover/src/PopoverContent/PopoverContent.svelte"

    interface $$Props {
        class?:string
    }
    
    let className = ''
    export { className as class }
    
</script>

<PopoverContent class={`TooltipContent ${className}`}>
    <slot/>
</PopoverContent>

<style lang='sass'>
    :global(.ClueTooltipContent)
        padding: 10px 16px
        border-radius: 12px
        color: var(--clue-color-white)
        background-color: var(--clue-color-gray-700)
</style>
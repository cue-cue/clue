<script lang='ts'>
	import PopoverArrow from "$lib/packages/popover/src/PopoverArrow/PopoverArrow.svelte"
    import PopoverContent from "$lib/packages/popover/src/PopoverContent/PopoverContent.svelte"

    interface $$Props {
        class?:string
    }
    
    let className = ''
    export { className as class }
    
</script>

<PopoverContent class={`TooltipContent ${className}`}>
    <slot/>
    <PopoverArrow/>
</PopoverContent>

<style lang='sass'>
    :global(.ClueTooltipContent)
        --background-color: var(--clue-color-gray-700)
        --clue-popover-arrow-background-color: var(--background-color)
        padding: 10px 16px
        border-radius: 12px
        color: var(--clue-color-white)
        background-color: var(--background-color)
</style>
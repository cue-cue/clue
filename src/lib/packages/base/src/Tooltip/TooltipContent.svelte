<script lang='ts'>
	import {PopoverArrow, PopoverContent} from "@cluue/popover"

    interface $$Props {
        class?:string
        size?:'small' | 'medium'
        theme?:'light' | 'dark'
    }
    
    let className = ''
    export { className as class }
    export let size:$$Props['size'] = undefined
    export let theme:$$Props['theme'] = undefined
    
</script>

<PopoverContent class={`TooltipContent ${className}`} data-size={size} data-theme={theme}>
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
    :global(.ClueTooltipContent[data-size='small'])
        padding: 8px 12px
        border-radius: 8px
    :global(.ClueTooltipContent[data-theme='light'])
        --background-color: #fff
        filter: drop-shadow(0 0 10px rgba(0,0,0, .2))
</style>
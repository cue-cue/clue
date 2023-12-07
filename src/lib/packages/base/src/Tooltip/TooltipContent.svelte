<script lang="ts">
	import { generateClassNames } from '$lib/packages/utils/src/index.js'
	import { PopoverArrow, PopoverContent } from '@cluue/popover'

	interface $$Props {
		class?: string
		size?: 'small' | 'medium'
		theme?: 'light' | 'dark'
	}

	let className = ''
	export { className as class }
	export let size: $$Props['size'] = undefined
	export let theme: $$Props['theme'] = undefined
</script>

<PopoverContent class={generateClassNames(['TooltipContent', className])} data-size={size} data-theme={theme}>
    <div class={generateClassNames(['TooltipContent__container'])}>
        <slot />
    </div>
</PopoverContent>

<style lang="sass">
    :global(.ClueTooltipContent)
        --background-color: var(--clue-color-gray-700)
        --clue-popover-arrow-background-color: var(--background-color)
        --clue-tooltip-content-border-radius: 12px
        display: flex
        flex-direction: column
    :global(.ClueTooltipContent[data-size='small'])
        padding: 8px 12px
        border-radius: 8px
    :global(.ClueTooltipContent[data-theme='light'])
        --background-color: #fff
        filter: drop-shadow(0 0 10px rgba(0,0,0, .2))
    .ClueTooltipContent
        &__container
            border-radius: var(--clue-tooltip-content-border-radius)
            color: var(--clue-color-white)
            background-color: var(--background-color)
            padding: 10px 16px
            overflow: auto
            flex: 1
</style>

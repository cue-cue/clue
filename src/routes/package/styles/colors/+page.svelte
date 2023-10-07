<script lang='ts'>
	import Icon from "$lib/packages/icons/src/components/Icon.svelte"
    import { Color } from "@clue/utils"
    import customColorIcon from '@clue/icons/line/cursor-click.svg'

    const colors = ['aubergine', 'gray', 'mustard', 'sky', 'green', 'coral']
    const values = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

    const getVariants = (color:string) => {
        return values.map(value => {
            return {
                color,
                value,
                cssVar: `--clue-color-${color}-${value}`
            }
        })
    }

    const getVariantsFromHSL = ({data}:ReturnType<typeof Color.hexToHSL>) => {
        return values.map(value => {
            return {
                value,
                cssVar: `hsl(${data.h}, ${data.s}%, ${(1000 - value) / 10}%)`
            }
        })
    }

    let customColor = '#cda7cd'
    $: customHSLResult = Color.hexToHSL(customColor)
</script>

<h2>Colors</h2>
<div class='custom-color' style:--color={customHSLResult.color}>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class='color-picker' style={`box-shadow: ${customColor.toLowerCase() === '#ffffff' ? '0 0 0 5px var(--clue-color-aubergine-100)' : 'none'}`}>
        <Icon icon={customColorIcon}/>
        <input type='color' bind:value={customColor}/>
        <span>{customColor}</span>
    </label>
    <ul class='color-list'>
        <li>
            <h3>Custom color: {customColor}</h3>
            <ul class='variant-list'>
                {#each getVariantsFromHSL(customHSLResult) as data (data.value)}
                    <li style:--color={data.cssVar} title={data.cssVar}>
                        <h5>{data.value}</h5>
                    </li>
                {/each}
            </ul>
        </li>
    </ul>
</div>
<ul class='color-list'>
    {#each colors as color (color)}
        <li>
            <h3>{color}</h3>
            <ul class='variant-list'>
                {#each getVariants(color) as data (data.value)}
                    <li style:--color={`var(${data.cssVar})`}>
                        <h5>{data.value}</h5>
                    </li>
                {/each}
            </ul>
        </li>
    {/each}
</ul>

<style lang="sass">
    .custom-color
        display: flex
        flex-direction: column
        align-items: center
    .color-picker
        display: flex
        align-items: center
        justify-content: center
        padding: 5px 0
        text-align: center
        width: 280px
        border-radius: var(--clue-size-border-radius)
        background: #fff
        border: 4px solid var(--color)
        cursor: pointer
        transition: var(--clue-transition)
        transition-property: box-shadow
        :global(.ClueIcon)
            --clue-icon-color: var(--color)
            flex: none
            width: 60px
            height: 60px
            transition: none
        span
            margin-left: 10px
            font-size: 40px
            display: block
            font-weight: 600
            color: var(--color)
        input
            display: none
    .color-list
        width: 100%
        list-style: none
        padding: 0
    .variant-list
        display: grid
        grid-template-columns: repeat(auto-fit, minmax(50px, 1fr))
        gap: 20px
        padding: 0
        li
            list-style: none
            text-align: center
            padding: 0
            &::before
                content: ''
                display: block
                width: 100%
                padding-bottom: 100%
                background: var(--color)
                border-radius: var(--clue-size-border-radius)
            h5
                margin-top: 10px
                margin-bottom: 0
</style>
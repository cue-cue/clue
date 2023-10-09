<script lang='ts'>
	import Icon from "$lib/packages/icons/src/components/Icon.svelte"
    import { Color } from "@clue/utils"
    import customColorIcon from '@clue/icons/line/cursor-click.svg'
	import { browser } from "$app/environment"
	import { derived } from "svelte/store"
	import { colorsStore } from "../../../stores/colors.js"

    const colors = ['primary', 'gray', 'active', 'blue', 'positive', 'negative']
    const values = [10, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 990]

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
            let l = data.l + ((500 - value) / 10)
            if (l > 100) {
                l = 100
            } else if (l < 0) {
                l = 0
            }
            const hsl = `hsl(${data.h}, ${data.s}%, ${l}%)`
            return {
                value,
                hsl,
                hex: Color.hslToHEX(hsl).color
            }
        })
    }

    const cssVarColorValue = derived(colorsStore, () => {
        return {
            get(cssVar:string) {
                if (browser) {
                    const bodyColor = getComputedStyle(document.body).getPropertyValue(cssVar)
                    const color = bodyColor || getComputedStyle(document.documentElement).getPropertyValue(cssVar)
                    let hsl = ''
                    let hex = ''
                    if (color.includes('hsl(')) {
                        hsl = color
                        hex = Color.hslToHEX(color).color
                    } else {
                        hex = color
                        hsl = Color.hexToHSL(color).color
                    }
                    return {
                        hsl,
                        hex
                    }
                }
                return undefined
            }
        }
    })

    const copyAction = (node:HTMLElement, val?:string) => {
        let text = val
        let timeout:ReturnType<typeof setTimeout>
        const attr = 'data-copying'
        const handleClick = () => {
            if (text) {
                navigator.clipboard.writeText(text)
                clearTimeout(timeout)
                node.setAttribute(attr, '')
                timeout = setTimeout(() => {
                    node.removeAttribute(attr)
                }, 400)
            }
        }

        node.addEventListener('click', handleClick)

        return {
            update(val:typeof text) {
                text = val
            },
            destroy() {
                node.removeEventListener('click', handleClick)
            }
        }
    }

    let customColor = '#cda7cd'
    $: customHSLResult = Color.hexToHSL(customColor)
</script>

<h2>Colors</h2>
<div class='custom-color' style:--color={customHSLResult.color}>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class='color-picker' style={`box-shadow: ${customColor.toLowerCase() === '#ffffff' ? '0 0 0 5px var(--clue-color-primary-100)' : 'none'}`}>
        <Icon icon={customColorIcon}/>
        <input type='color' bind:value={customColor}/>
        <span>{customColor}</span>
    </label>
    <ul class='color-list'>
        <li>
            <h3>Custom color: {customColor}</h3>
            <ul class='variant-list'>
                {#each getVariantsFromHSL(customHSLResult) as data (data.value)}
                    <li style:--color={data.hex} data-value={data.value}>
                        <button use:copyAction={data.hsl}>
                            <span>
                                <b>{data.hex}</b>
                                <small>{data.hsl.replace(/[\s(hsl)]/gi, '')}</small>
                            </span>
                        </button>
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
                    {@const cssVarValue = $cssVarColorValue.get(data.cssVar)}
                    <li style:--color={`var(${data.cssVar})`} data-value={data.value}>
                        <button use:copyAction={cssVarValue?.hsl}>
                            {#if cssVarValue}
                                <span>
                                    <b>{cssVarValue.hex}</b>
                                    <small>{cssVarValue.hsl.replace(/[\s(hsl)deg]/gi, '')}</small>
                                </span>
                            {/if}
                        </button>
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
        background: var(--clue-color-white)
        border: 4px solid var(--color)
        cursor: pointer
        position: relative
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
            // display: none
            position: absolute
            top: -100px
            right: -40px
            width: 0
            height: 0
            pointer-events: none
            opacity: 0
    .color-list
        width: 100%
        list-style: none
        padding: 0
    .variant-list
        display: grid
        grid-template-columns: repeat(auto-fit, minmax(90px, 1fr))
        gap: 20px
        padding: 0
        li
            list-style: none
            text-align: center
            padding: 0
            margin: 0
            &::after
                content: attr(data-value)
                display: block
                font-size: 14px
                font-weight: 600
                margin-top: 10px
            &[data-value='500']
                button
                    &::before
                        opacity: 1
            &:not([data-value='500'])
                button:not([data-copying])
                    &:hover
                        &::before
                            opacity: .2
            :global(button[data-copying])
                &::before
                    opacity: 1
                    height: calc(100% - 16px)
            button
                border: none
                cursor: pointer
                position: relative
                width: 100%
                padding-bottom: 100%
                background: var(--color)
                border-radius: var(--clue-size-border-radius)
                &:hover
                    span
                        opacity: 1
                &::before
                    content: ''
                    position: absolute
                    top: 8px
                    left: 50%
                    transform: translateX(-50%)
                    width: 50%
                    height: 4px
                    border-radius: 10px
                    background: var(--clue-color-white)
                    mix-blend-mode: difference
                    opacity: 0
                    transition: var(--clue-transition)
                    transition-property: opacity, height
                span
                    display: block
                    position: absolute
                    text-align: center
                    width: 100%
                    opacity: .2
                    top: 50%
                    left: 50%
                    transform: translate(-50%, -50%)
                    font-size: 14px
                    font-weight: 500
                    color: var(--clue-color-white)
                    mix-blend-mode: difference
                    transition: var(--clue-transition)
                    small
                        display: block
                        width: 100%
                        font-size: 8px
</style>
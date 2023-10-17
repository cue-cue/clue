<script lang='ts'>
    import "$lib/packages/styles/src/index.scss"
    import "./styles/index.scss"
	import {Button} from "@cluue/base";
    import textFieldIcon from '@cluue/icons/line/eye.svg?clue'
    import iconsIcon from '@cluue/icons/line/papers.svg?clue'
    import buttonIcon from '@cluue/icons/line/bell.svg?clue'
    import checkboxIcon from '@cluue/icons/line/check-square.svg?clue'
    import colorsIcon from '@cluue/icons/line/apple-fruit.svg?clue'
    import selectIcon from '@cluue/icons/line/note-list-square.svg?clue'
    import popoverIcon from '@cluue/icons/line/chat-heart.svg?clue'
    import {page} from '$app/stores'
	import type { ComponentProps } from "svelte";
    import { onMount } from "svelte"
    import {compileString} from 'sass'
	import { colorsStore } from "./stores/colors.js"
	import { Color } from "@cluue/utils"
	import { browser } from "$app/environment"

    const menuItems:(ComponentProps<Button> & {name:string})[] = [
        {
            name: 'TextField',
            href: '/package/forms/text-field',
            startIcon: textFieldIcon
        },
		{
            name: 'Select',
            href: '/package/forms/select',
            startIcon: selectIcon
        },
        {
            name: 'Icons',
            href: '/package/icons',
            startIcon: iconsIcon
        },
        {
            name: 'Button',
            href: '/package/base/button',
            startIcon: buttonIcon
        },
        {
            name: 'Checkbox',
            href: '/package/forms/checkbox',
            startIcon: checkboxIcon
        },
        {
            name: 'Colors',
            href: '/package/styles/colors',
            startIcon: colorsIcon
        },
        {
            name: 'Popover',
            href: '/package/popover',
            startIcon: popoverIcon
        }
    ]

	const loadColorsInStyles = () => {
		if (!browser) return
		const colorGeneratorScss = `
			@use 'sass:color';
			@use 'sass:math';

			@function get-color-by-value($color, $value: 500) {
				$percent: math.div(500 - $value, 1000);
				$colorResult: color.adjust($color, $lightness: math.percentage($percent));

				$colorString: 'hsl(#{math.round(color.hue($colorResult))}, #{math.round(color.saturation($colorResult))}, #{math.round(color.lightness($colorResult))})';
				@return $colorString;
			}

			@mixin color-generator($name, $color) {
				$root: '--clue-color-#{$name}';
				$lightnessList: 10, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 990;
				@each $lightnessValue in $lightnessList {
					$colorString: get-color-by-value($color, $lightnessValue);
					#{$root}-#{$lightnessValue}: #{$colorString};
				}
				#{$root}: #{'var(#{$root}-500)'}
			}
		`
		const scss = `
			${colorGeneratorScss}
            body[clue-custom] {
				${Object.entries($colorsStore).map(([name, color]) => `@include color-generator('${name}', ${color});`).join('\n')}
			}
        `

		const css = compileString(scss).css

		const styleSheet = new CSSStyleSheet()

		styleSheet.replaceSync(css)

		document.adoptedStyleSheets = [styleSheet]

	}

    onMount(() => {
		loadColorsInStyles()
		const rootStyles = getComputedStyle(document.documentElement)
		Object.keys($colorsStore).forEach(colorKey => {
			const color = rootStyles.getPropertyValue(`--clue-color-${colorKey}`)
			const isHSL = color.includes('hsl(')
			$colorsStore[colorKey] = isHSL ? Color.hslToHEX(rootStyles.getPropertyValue(`--clue-color-${colorKey}`)).color : color
		})
    })

	$: {
		loadColorsInStyles()
		$colorsStore
	}

</script>

<header>
    <nav>
        {#each menuItems as button (button.href)}
            {@const active = $page.url.pathname.startsWith(button.href || '')}
            <Button {...button} size='small' type={active ? 'primary' : 'ghost'}>{button.name}</Button>
        {/each}
    </nav>
	<div class='colors'>
		{#each Object.keys($colorsStore) as color (color)}
			<label style:--color={$colorsStore[color]}>
				<input type="color" bind:value={$colorsStore[color]}>
				<span></span>
			</label>
		{/each}
	</div>
</header>
<main>
    <slot/>
</main>

<style lang='sass'>
	header
		width: 100%
		display: flex
		border-bottom: 2px solid var(--clue-color-gray-100)
		align-items: center
		flex-wrap: wrap
		padding: 10px 0
		background: var(--clue-color-white)
		position: sticky
		z-index: 10
		top: 0
		nav
			flex: none
			max-width: 100%
	.colors
		margin-left: auto
		display: flex
		list-style: none
		margin-top: 10px
		margin-bottom: 10px
		label
			cursor: pointer
			display: block
			position: relative
			width: 16px
			height: 16px
			border-radius: 50%
			background: var(--color)
			transition: var(--clue-transition)
			transition-property: background, opacity
			&:hover
				opacity: .8
			&:not(:last-child)
				margin-right: 5px
			input
				width: 0
				height: 0
				pointer-events: none
				opacity: 0
				&:focus ~ span
					box-shadow: 0 0 0 4px  var(--clue-color-primary-100)
			span
				display: block
				position: absolute
				top: 0
				left: 0
				width: 100%
				height: 100%
				border-radius: 50%
				transition: var(--clue-transition)
				transition-property: box-shadow
</style>
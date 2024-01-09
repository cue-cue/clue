<script lang="ts">
	import dayjs from 'dayjs'
	import ru from 'dayjs/locale/ru'
	import '$lib/packages/styles/src/index.scss'
	import colorGeneratorScss from '$lib/packages/styles/src/generators/color.scss?raw'
	import './styles/index.scss'
	import { Button } from '@cluue/base'
	import packageBaseIcon from '@cluue/icons/line/eye.svg?clue'
	import textFieldIcon from '@cluue/icons/line/eye.svg?clue'
	import iconsIcon from '@cluue/icons/line/papers.svg?clue'
	import buttonIcon from '@cluue/icons/line/bell.svg?clue'
	import checkboxIcon from '@cluue/icons/line/check-square.svg?clue'
	import packageColorsIcon from '@cluue/icons/line/apple-fruit.svg?clue'
	import selectIcon from '@cluue/icons/line/note-list-square.svg?clue'
	import popoverIcon from '@cluue/icons/line/chat-heart.svg?clue'
	import tooltipIcon from '@cluue/icons/line/user-tag.svg?clue'
	import calendarIcon from '@cluue/icons/line/calendar.svg?clue'
	import calendarCoreIcon from '@cluue/icons/line/calendar-heart.svg?clue'
	import { page } from '$app/stores'
	import type { ComponentProps } from 'svelte'
	import { onMount } from 'svelte'
	import { compileString } from 'sass'
	import { colorsStore } from './stores/colors.js'
	import { Color } from '@cluue/utils'
	import { browser } from '$app/environment'
	import { Tooltip } from '@cluue/base'

	type Link = ComponentProps<Button> & { name: string }

	// dayjs.locale('ru', ru)

	const packages: (Link & { pages?: Link[] })[] = [
		{
			name: 'Base',
			startIcon: packageBaseIcon,
			pages: [
				{
					name: 'Button',
					href: '/package/base/button',
					startIcon: buttonIcon,
				},
				{
					name: 'Tooltip',
					href: '/package/base/tooltip',
					startIcon: tooltipIcon,
				},
			],
		},
		{
			name: 'Icons',
			href: '/package/icons',
			startIcon: iconsIcon,
		},
		{
			name: 'Colors',
			href: '/package/styles/colors',
			startIcon: packageColorsIcon,
		},
		{
			name: 'Forms',
			startIcon: packageColorsIcon,
			pages: [
				{
					name: 'TextField',
					href: '/package/forms/text-field',
					startIcon: textFieldIcon,
				},
				{
					name: 'Select',
					href: '/package/forms/select',
					startIcon: selectIcon,
				},
				{
					name: 'Checkbox',
					href: '/package/forms/checkbox',
					startIcon: checkboxIcon,
				},
			],
		},
		{
			name: 'Popover',
			href: '/package/popover',
			startIcon: popoverIcon,
		},
		{
			name: 'Calendar',
			href: '/package/calendar',
			startIcon: calendarIcon,
			pages: [
				{
					name: 'Core',
					href: '/package/calendar/core',
					startIcon: calendarCoreIcon,
				},
			],
		},
	]

	const loadColorsInStyles = () => {
		if (!browser) return
		const scss = `
			${colorGeneratorScss}
            body[clue-custom] {
				${Object.entries($colorsStore)
					.map(([name, color]) => `@include color-generator('${name}', ${color});`)
					.join('\n')}
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
		Object.keys($colorsStore).forEach((colorKey) => {
			const color = rootStyles.getPropertyValue(`--clue-color-${colorKey}`)
			const isHSL = color.includes('hsl(')
			$colorsStore[colorKey] = isHSL
				? Color.hslToHEX(rootStyles.getPropertyValue(`--clue-color-${colorKey}`)).color
				: color
		})
	})

	let headerHeight = 0

	$: if (browser) {
		document.body.style.setProperty('--header-height', `${headerHeight}px`)
	}

	$: {
		loadColorsInStyles()
		$colorsStore
	}
</script>

<svelte:head>
	<title>Clue</title>
</svelte:head>

<header bind:clientHeight={headerHeight}>
	<nav>
		<!-- {#each menuItems as button (button.href)}
            {@const active = $page.url.pathname.startsWith(button.href || '')}
            <Button {...button} size='small' type={active ? 'primary' : 'ghost'}>{button.name}</Button>
        {/each} -->
		{#each packages as { name, pages, ...packageItem } (name)}
			<Tooltip placement="bottom-start" theme="light" arrow={false} disabled={!pages?.length}>
				<Button
					{...packageItem}
					size="small"
					type={packageItem.href && $page.url.pathname.startsWith(packageItem.href)
						? 'primary'
						: 'ghost'}>{name}</Button
				>
				<svelte:fragment slot="content">
					{#if pages?.length}
						<ul>
							{#each pages as { name, ...pageItem } (name)}
								<li>
									<Button
										size="small"
										type={pageItem.href &&
										$page.url.pathname.startsWith(pageItem.href)
											? 'primary'
											: 'ghost'}
										{...pageItem}
									>
										{name}
									</Button>
								</li>
							{/each}
						</ul>
					{/if}
				</svelte:fragment>
			</Tooltip>
		{/each}
	</nav>
	<div class="colors">
		{#each Object.keys($colorsStore) as color (color)}
			<label style:--color={$colorsStore[color]}>
				<input type="color" bind:value={$colorsStore[color]} />
				<span />
			</label>
		{/each}
	</div>
</header>
<main>
	<slot />
</main>

<style lang="sass">
	header
		width: 100%
		display: flex
		border-bottom: 1px solid var(--clue-color-primary-100)
		align-items: center
		flex-wrap: wrap
		padding: 10px 20px
		background: var(--clue-color-white)
		position: sticky
		z-index: 10
		top: 0
		left: 0
		nav
			flex: none
			max-width: 100%
			ul
				margin: 0
				padding: 0
				list-style: none
				li
					width: 100%
					&:not(:last-child)
						margin-bottom: 5px
					:global(.ClueButton)
						width: 100%
	main
		padding: 40px 20px
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

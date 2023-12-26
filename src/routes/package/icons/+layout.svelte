<script lang="ts">
	import type { ClueSvgIconData } from '$lib/packages/icons/src/index.js'
	import { Button } from '@cluue/base'
	import lineIcon from '@cluue/icons/line/bell.svg?clue'
	import filledIcon from '@cluue/icons/filled/bell.svg?clue'
	import test from '@cluue/icons/line/eye.svg?clue'
	import { page } from '$app/stores'

	const groups: {
		name: string
		href: string
		icon: ClueSvgIconData['default']
	}[] = [
		{
			name: 'Line',
			href: '/package/icons/line',
			icon: lineIcon,
		},
		{
			name: 'Filled',
			href: '/package/icons/filled',
			icon: filledIcon,
		},
	]
</script>

<div style="display: flex; gap: 30px; justify-content: center; margin-top: 20px">
	{#each groups as { href, icon, name } (href)}
		{@const active = $page.url.pathname.startsWith(href)}
		<Button {href} startIcon={icon} type={active ? 'primary' : 'ghost'} size="small"
			>{name}</Button
		>
	{/each}
</div>
<div style="margin-top: 20px">
	<slot />
</div>

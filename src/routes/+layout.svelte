<script lang='ts'>
    import "$lib/packages/styles/src/index.sass"
    import "./styles/index.sass"
	import {Button} from "@clue/base";
    import inputIcon from '@clue/icons/line/eye.svg'
    import iconsIcon from '@clue/icons/line/papers.svg'
    import buttonIcon from '@clue/icons/line/bell.svg'
    import {page} from '$app/stores'
	import type { ComponentProps } from "svelte";

    const menuItems:(ComponentProps<Button> & {name:string})[] = [
        {
            name: 'Input',
            href: '/input',
            startIcon: inputIcon
        },
        {
            name: 'Icons',
            href: '/icons',
            startIcon: iconsIcon
        },
        {
            name: 'Button',
            href: '/button',
            startIcon: buttonIcon
        }
    ]

</script>

<header>
    <nav>
        {#each menuItems as button (button.href)}
            <Button {...button} size='small' color={$page.url.pathname.startsWith(button.href || '') ? 'primary' : 'ghost'}>{button.name}</Button>
        {/each}
    </nav>
    <hr>
</header>
<main>
    <slot/>
</main>
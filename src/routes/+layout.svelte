<script lang='ts'>
    import "$lib/packages/styles/src/index.sass"
    import "./styles/index.scss"
	import {Button} from "@clue/base";
    import inputIcon from '@clue/icons/line/eye.svg'
    import iconsIcon from '@clue/icons/line/papers.svg'
    import buttonIcon from '@clue/icons/line/bell.svg'
    import checkboxIcon from '@clue/icons/line/check-square.svg'
    import {page} from '$app/stores'
	import type { ComponentProps } from "svelte";

    const menuItems:(ComponentProps<Button> & {name:string})[] = [
        {
            name: 'Input',
            href: '/package/input',
            startIcon: inputIcon
        },
        {
            name: 'Icons',
            href: '/package/icons',
            startIcon: iconsIcon
        },
        {
            name: 'Button',
            href: '/package/button',
            startIcon: buttonIcon
        },
        {
            name: 'Checkbox',
            href: '/package/checkbox',
            startIcon: checkboxIcon
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
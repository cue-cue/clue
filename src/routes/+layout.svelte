<script lang='ts'>
    import "$lib/packages/styles/src/index.sass"
    import "./styles/index.sass"
	import {Button} from "@clue/base";
    import eye from '@clue/icons/line/eye.svg'
    import calendar from '@clue/icons/line/calendar.svg'
    import cross from '@clue/icons/line/cross.svg'
    import {page} from '$app/stores'
	import type { ComponentProps } from "svelte";
	import { get } from "svelte/store";
    
    const menuItems:(ComponentProps<Button> & {name:string})[] = [
        {
            name: 'Input',
            href: '/input',
            startIcon: eye
        },
        {
            name: 'Icons',
            href: '/icons',
            startIcon: calendar
        },
        {
            name: 'Button',
            href: '/button',
            startIcon: cross
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
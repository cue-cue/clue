<script lang='ts'>
    import {Button} from '@clue/base'
	import type { ComponentProps } from 'svelte';
    import eye from '@clue/icons/line/eye.svg'

    const buttons:(ComponentProps<Button> & {id: string, content:string})[] = [
        {
            id: 'base',
            content: 'Base'
        },
        {
            id: 'base startIcon',
            content: 'Base',
            startIcon: eye
        },
        {
            id: 'base endIcon',
            content: 'Base',
            endIcon: eye
        },
        {
            id: 'base all icons',
            content: 'Base',
            startIcon: eye,
            endIcon: eye
        },
        {
            id: 'base disabled',
            content: 'Base',
            disabled: true
        },
        {
            id: 'base link',
            content: 'to input page',
            disabled: true,
            href: './input'
        },
        {
            id: 'base size:small',
            content: 'to input page',
            disabled: true,
            
        }
    ]

</script>

<h2>Button</h2>
<ul>
    {#each buttons as {id, content, ...button} (id)}
        <li>
            <small>{id}</small><br>
            <Button {...button}>{content}</Button>
        </li>
    {/each}
</ul>
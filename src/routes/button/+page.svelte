<script lang='ts'>
    import {Button, IconButton} from '@clue/base'
	import type { ComponentProps } from 'svelte';
    import eye from '@clue/icons/line/eye.svg'

    const getButtonStyles = (variantOptions?:ComponentProps<Button>) => {
        const sizes:Exclude<ComponentProps<Button>['size'], undefined>[] = ['large', 'medium', 'small']
        return sizes.reduce<Record<typeof sizes[number], (ComponentProps<Button> & {id:string})[]>>((val, size) => {
            val[size] = [
                {
                    id: 'All icons',
                    size,
                    startIcon: eye,
                    endIcon: eye,
                },
                {
                    id: 'Start icon',
                    size,
                    startIcon: eye,
                },
                {
                    id: 'End icon',
                    size,
                    endIcon: eye,
                },
                {
                    id: 'Disabled',
                    size,
                    startIcon: eye,
                    endIcon: eye,
                    disabled: true
                },
                {
                    id: 'Link',
                    size,
                    startIcon: eye,
                    endIcon: eye,
                    href: './'
                },
                {
                    id: 'Disabled Link',
                    size,
                    startIcon: eye,
                    endIcon: eye,
                    href: './',
                    disabled: true
                },
            ].map(props => ({...(variantOptions || {}), ...props}))
            return val
        }, {
            small: [],
            medium: [],
            large: []
        })
    }

    const variants:{
        name:string,
        styles:ReturnType<typeof getButtonStyles>
    }[] = [
        {
            name: 'Default (Primary)',
            styles: getButtonStyles()
        },
        {
            name: 'Action',
            styles: getButtonStyles({
                color: 'action'
            })
        },
        {
            name: 'Secondary',
            styles: getButtonStyles({
                color: 'secondary'
            })
        },
        {
            name: 'Ghost',
            styles: getButtonStyles({
                color: 'ghost'
            })
        },
        {
            name: 'Ghost Outlined',
            styles: getButtonStyles({
                color: 'ghost',
                variant: 'outlined'
            })
        },
    ] 

</script>

<h2>Button</h2>
<hr>
{#each variants as {name, styles} (name)}
    <h3>{name}</h3>
    <ul style='display: flex; gap: 30px;'>
        {#each Object.entries(styles) as [size, buttons] (size)}
            <li>
                <h4 style='text-align: center; display:block;'>size: {size}</h4>
                <ul>
                    {#each buttons as {id, ...button} (id)}
                        <li>
                            <h5>{id}</h5>
                            <div style='display: flex; gap: 16px; align-items: center'>
                                <Button {...button}>Button</Button>
                                <IconButton icon={eye} {...button}/>
                            </div>
                        </li>
                    {/each}
                </ul>
            </li>
        {/each}
    </ul>
{/each}
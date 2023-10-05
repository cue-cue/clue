<script lang='ts'>
	import InputCheckbox from '$lib/packages/base/src/Input/InputCheckbox.svelte';
	import { randomId } from '$lib/packages/utils/src/index.js';
    import {Checkbox, Radio} from '@clue/base'
	import type { ComponentProps } from 'svelte';

    const items:Parameters<typeof genVariants>[0][] = [
        {
            id: 'Base',
            component: Checkbox
        },
        // {
        //     id: 'Label',
        //     label: 'Lorem ipsum',
        //     component: Checkbox
        // },
        // {
        //     id: 'Radio',
        //     component: Radio
        // },
        // {
        //     id: 'Radio + label',
        //     label: 'Lorem ipsum',
        //     component: Radio
        // }
    ]

    const genVariants = (params:Omit<ComponentProps<Checkbox>, 'value'> & {component:ConstructorOfATypedSvelteComponent}):(typeof params & {
        value: string,
        name: string
    })[] => {
        const name = randomId()
        return [
            {
                ...params,
                name,
                value: 'default'
            },
            {
                ...params,
                name,
                value: 'checked',
                checked: true,
            },
            {
                ...params,
                name,
                value: 'disabled',
                disabled: true,
            },
            {
                ...params,
                name,
                value: 'checked + disabled',
                checked: true,
                disabled: true
            }
        ]
    }

    let groups = {
        'Base': []
    }
</script>

<ul>
    {#each items as {id, ...item} (id)}
        <li>
            <h4>{id}: <small>[{groups[id]?.join(', ') || ''}]</small></h4>
            <ul style="display: flex; gap: 30px">
                {#each genVariants(item) as {component, value, ...props} (value)}
                    <li>
                        <h5 style="margin: 0; margin-bottom: 10px">{value}</h5>
                        <svelte:component this={component} bind:group={groups[id]} {...props} {value}/>
                    </li>
                {/each}
            </ul>
        </li>
    {/each}
</ul>
<script lang='ts'>
	import { randomId } from '@clue/utils';
    import {Checkbox, Radio} from '@clue/forms'
	import type { ComponentProps } from 'svelte';

    const items:(Omit<ComponentProps<Checkbox>, 'value' | 'id' | 'group'> & {
        component: any
        id: string
        label?:string
    })[] = [
        {
            id: 'Base',
            component: Checkbox,
        },
        {
            id: 'Label',
            label: 'Lorem ipsum',
            component: Checkbox
        },
        {
            id: 'Radio',
            component: Radio
        },
        {
            id: 'Radio + label',
            label: 'Lorem ipsum',
            component: Radio
        }
    ]

    const genVariants = (params:Omit<typeof items[0], 'id'>) => {
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
                // checked: true,
                disabled: true
            }
        ]
    }

    let groups = items.reduce<Partial<Record<string, string[] | string>>>((val, {id, component, ...all}) => {
        val[id] = component.name === Radio.name ? 'checked + disabled' : ['checked + disabled']
        return val
    }, {})

</script>

<ul>
    {#each items as {id, ...item} (id)}
        <li>
            <h4>{id}: <small>{groups[id]}</small></h4>
            <ul style="display: flex; gap: 30px">
                {#each genVariants(item) as {component, label, value, ...props} (value)}
                    <li>
                        <h5 style="margin: 0; margin-bottom: 10px">{value}</h5>
                        <svelte:component this={component} bind:group={groups[id]} {...props} {value} let:label={labelComponent}>
                            {#if label}
                                <svelte:component this={labelComponent}>{label}</svelte:component>
                            {/if}
                        </svelte:component>
                    </li>
                {/each}
            </ul>
        </li>
    {/each}
</ul>
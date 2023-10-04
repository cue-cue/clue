<script lang='ts'>
    import {Checkbox} from '@clue/base'
	import type { ComponentProps } from 'svelte';

    const items:(ComponentProps<Checkbox> & {id:string})[] = [
        {
            id: 'Base',
        },
        {
            id: 'Label',
            label: 'Lorem ipsum'
        }
    ]

    const genVariants = (params:ComponentProps<Checkbox>):(ComponentProps<Checkbox> & {id: string})[] => {
        return [
            {
                ...params,
                id: 'default'
            },
            {
                ...params,
                id: 'checked',
                checked: true,
            },
            {
                ...params,
                id: 'disabled',
                disabled: true,
            },
            {
                ...params,
                id: 'checked + disabled',
                checked: true,
                disabled: true
            }
        ]
    }

</script>

<ul>
    {#each items as {id, ...item} (id)}
        <li>
            <h4>{id}</h4>
            <ul style="display: flex; gap: 30px">
                {#each genVariants(item) as {id, ...props} (id)}
                    <li>
                        <h5 style="margin: 0; margin-bottom: 10px">{id}</h5>
                        <Checkbox {...props}/>
                    </li>
                {/each}
            </ul>
        </li>
    {/each}
</ul>
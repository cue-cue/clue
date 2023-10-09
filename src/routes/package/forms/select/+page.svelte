<script lang='ts'>
	import {Select} from "@clue/forms"
	import type { ComponentProps } from "svelte"

    const items:(ComponentProps<Select> & {id: string})[] = [
        {
            id: 'Base',

        }
    ]
</script>

<h2>Select</h2>

<ul>
    {#each items as {id, ...item} (id)}
        <h3>{id}</h3>
        <Select {...item}/>
    {/each}
</ul>
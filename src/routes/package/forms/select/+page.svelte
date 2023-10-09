<script lang='ts'>
	import type { IOption } from "$lib/packages/forms/src/Select/types.js"
	import {Select} from "@clue/forms"
	import type { ComponentProps } from "svelte"

    const items:(ComponentProps<Select<IOption<string>[], false>> & {id: string})[] = [
        {
            id: 'Base',
            options: [
                {
                    value: 'test',
                    label: 'test'
                },
                {
                    value: 'test1',
                    label: 'test'
                },
                {
                    value: 'test2',
                    label: 'test'
                },
                {
                    value: 'test3',
                    label: 'test',
                }
            ],
        }
    ]
</script>

<h2>Select</h2>

<ul>
    {#each items as {id, ...item} (id)}
        <li>
            <h3>{id}</h3>
            <ul>
                <li>
                    <Select {...item}/> 
                </li>
                <li>
                    <Select {...item} multiple value={[]}/>
                </li>
                <li>
                    <Select options={[{value: 0, label: ''}]} multiple value={[1]}/>
                </li>
            </ul>
        </li>
    {/each}
</ul>

<style lang="sass">
    ul
        li
            ul
                width: calc(100% - 60px)
                display: flex
                li
                    width: 100%
                    &:not(:last-child)
                        margin-right: 20px

</style>
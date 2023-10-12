<script lang='ts'>
	import type { IOption, OptionValue } from "$lib/packages/forms/src/Select/types.js"
	import {Select} from "@clue/forms"
	import type { ComponentProps } from "svelte"

    const items:(ComponentProps<Select<IOption<string>[], boolean>> & {id: string})[] = [
        {
            id: 'Base',
            options: [
                {
                    value: 'test',
                    label: 'test'
                },
                {
                    value: 'test1',
                    label: 'test1',
                },
                {
                    value: 'test2',
                    label: 'test2'
                },
                {
                    value: 'test3',
                    label: 'test3',
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
                    <Select {...item} multiple value={[]} allowSearch={true}/>
                </li>
            </ul>
            <ul>
                <li>
                    <Select options={[{value: 0, label: ''}]} multiple={false} value={0}/>
                </li>
                <li>
                    <Select {...item} disabled multiple={true} value={[]} allowSearch={true}/>
                </li>
            </ul>
            <ul>
                <li>
                    <Select {...item} error/>
                </li>
                <li>
                    <Select {...item} multiple value={[]} error/>
                </li>
            </ul>
            <ul>
                <li>
                    <Select {...item} error disabled/>
                </li>
                <li>
                    <Select {...item} readonly error/>
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
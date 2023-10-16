<script lang='ts'>
    import {Button} from "@clue/base"
    import { Popover, PopoverContent } from "@clue/popover"
	import type { ComponentProps } from "svelte"

    const items:Array<ComponentProps<Popover> & {id:string}> = [
        {
            id: 'Base'
        },
        {
            id: 'Placement: top',
            placement: 'top'
        },
        {
            id: 'Placement: bottom',
            placement: 'bottom'
        },
        {
            id: 'Placement: right',
            placement: 'right'
        },
        {
            id: 'Placement: left',
            placement: 'left'
        }
    ]
    
</script>

<h2>Popover</h2>

<ul>
    {#each items as {id, ...item} (id)}
        <li>
            <h3>{id}</h3>
            <pre>{JSON.stringify(item)}</pre>
            <Popover let:action {...item}>
                <div use:action style='display: inline-block'>
                    <Button>Popover</Button>
                </div>
                <svelte:fragment slot='content'>
                    <Popover let:action {...item}>
                        <div use:action style='display: inline-block'>
                            <Button>Push me 💜</Button>
                        </div>
                        <svelte:fragment slot='content'>
                            <Button size='small'>Cuuuuuueee💜</Button>
                        </svelte:fragment>
                    </Popover>
                </svelte:fragment>
            </Popover>
        </li>
    {/each}
</ul>

<style lang="sass">
    ul
        display: grid
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))
        gap: 20px
        align-items: end
</style>
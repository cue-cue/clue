<script lang='ts'>
    import {Button} from "@cluue/base"
    import { Popover, PopoverContent } from "@cluue/popover"
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

<ul class='popover-list'>
    {#each items as {id, ...item} (id)}
        <li>
            <h3>{id}</h3>
            <pre>{JSON.stringify(item)}</pre>
            <Popover {...item}>
                <Button>Popover</Button>
                <svelte:fragment slot='content'>
                    <Popover {...item}>
                        <Button size='small'>Hovvvver me 💜</Button>
                        <svelte:fragment slot='content'>
                            <Button size='small'>Cuuue💜</Button>
                        </svelte:fragment>
                    </Popover>
                </svelte:fragment>
            </Popover>
        </li>
    {/each}
</ul>

<style lang="sass">
    .popover-list
        display: grid
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))
        gap: 20px
        align-items: end
        :global(.CluePopoverContent)
            padding: 10px
            border-radius: var(--clue-size-border-radius-2)
            background: var(--clue-color-white)
            border: 1px solid var(--clue-color-gray-50)
</style>
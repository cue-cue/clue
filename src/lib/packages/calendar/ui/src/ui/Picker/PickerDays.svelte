<script lang='ts'>
    import {CellList} from '@cluue/calendar-core'
	import Cell from '../Cell.svelte'

    interface $$Props {
        class?:string
    }
    
    let className = ''
    export { className as class }

    const cellList = new CellList({
        date: new Date(),
        step: 1,
        end: 4 * 7,
        unitType: 'day'
    })
    
</script>

<div class={`PickerDays ${className}`}>
    <div class="PickerDays__grid">
        {#each cellList.cells as cell (+cell.from)}
            <Cell date={cell.from}/>
        {/each}
    </div>
</div>

<style lang='sass'>
    .PickerDays
        &__grid
            width: 100%
            display: grid
            grid-template-columns: repeat(7, 1fr)
            gap: 8px
            align-items: center
            justify-items: center
</style>
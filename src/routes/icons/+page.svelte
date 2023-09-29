<script lang='ts'>
    import {Icon} from '@clue/icons'
    import * as lineIcons from '@clue/icons/line'
</script>

<div>
    <main>
        <h2>Icons</h2>
        <div>
            <h3>line</h3>
            <ul>
                {#each Object.entries(lineIcons) as [name, icon] (name)}
                    <li>
                        <small>{name}</small>
                        <Icon {icon}/>
                    </li>
                {/each}
            </ul>
        </div>
    </main>
</div>
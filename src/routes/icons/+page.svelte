<script lang='ts'>
	import type { IIcon } from '$lib/packages/icons/src/types/index.js';
    import {Icon} from '@clue/icons'
    import * as lineIcons from '@clue/icons/line'

    export let data

    const getIcons = (icons:Record<string, IIcon>) => {
        return Object.entries(icons).sort((a,b) => {
            if (a[0] < b[0]) {
                return -1
            }
            if (a[0] > b[0]) {
                return 1
            }
            return 0
        })
    }

    const iconGroups:Record<string, ReturnType<typeof getIcons>> = {
        'line': getIcons(lineIcons),
    }
</script>

<div>
    <main>
        <h2>Icons</h2>
        <div>
            {#each Object.entries(iconGroups) as [group, icons] (group)}
                <h3>{group}</h3>
                <ul>
                    {#each icons as [name, icon] (name)}
                        <li>
                            <small><b>{name}</b> ({icon.size.width}/{icon.size.height})px</small>
                            <Icon {icon}/>
                        </li>
                    {/each}
                </ul>
            {/each}
        </div>
    </main>
</div>
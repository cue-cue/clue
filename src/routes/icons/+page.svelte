<script lang='ts'>
	import type { IIcon } from '$lib/packages/icons/src/types/index.js';
    import {Icon} from '@clue/icons'
    import * as lineIcons from '@clue/icons/line'

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

    const generateMoreSizeIcon = (icon:IIcon) => {
        const sizes = [8, 16, 24, 32, 46]
        return sizes.map(size => ({
            icon,
            size: {
                width: size,
                height: size
            }
        }))
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
                            <b>{name}</b> 
                            <ul style='display: flex; gap: 10px; list-style: none'>
                                {#each generateMoreSizeIcon(icon) as data}
                                    <li>
                                        <small>({data.size.width}/{data.size.height})px</small><br/>
                                        <Icon icon={data.icon} {...data.size}/>
                                    </li>
                                {/each}
                            </ul>
                        </li>
                    {/each}
                </ul>
            {/each}
        </div>
    </main>
</div>
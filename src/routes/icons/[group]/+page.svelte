<script lang='ts'>
    import {Icon, type ClueSvgIconData} from '@clue/icons'
    import * as allIcons from '../iconsList.js'

    const getIcons = () => {
        const groups = Object.values<ClueSvgIconData>(allIcons).reduce<Record<string, ClueSvgIconData[]>>((val,icon) => {
            if (val[icon.groupName]) {
                val[icon.groupName].push(icon)
            } else {
                val[icon.groupName] = [icon]
            }
            return val
        }, {})

        return Object.entries(groups).sort((a,b) => {
            if (a[0] < b[0]) {
                return -1
            }
            if (a[0] > b[0]) {
                return 1
            }
            return 0
        })
    }

    const generateMoreSizeIcon = (icon:ClueSvgIconData) => {
        const sizes = [8, 12, 16, 24, 30, 40]
        return sizes.map(size => ({
            icon,
            size: {
                width: size,
                height: size
            }
        }))
    }
</script>

<div>
    <main>
        <h2>@icons</h2>
        <div>
            {#each getIcons() as [group, icons] (group)}
                <h3>/{group}</h3>
                <ul>
                    {#each icons as icon (icon.default)}
                        <li>
                            <b>/{icon.default.replace('clue-', '')} <small>{JSON.stringify(icon.size)}</small></b> 
                            <ul style='display: flex; gap: 10px; list-style: none'>
                                {#each generateMoreSizeIcon(icon) as {icon:data, size}}
                                    <li>
                                        <small>({size.width}/{size.height})px</small><br/>
                                        <Icon icon={data.default} {...size}/>
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
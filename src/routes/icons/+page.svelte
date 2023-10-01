<script lang='ts'>
    import {Icon, type SvgIconData} from '@clue/icons'
	import { fade, slide } from 'svelte/transition';

    export let data

    const getIcons = async () => {
        
        const promises = data.allIconsPath.map(path => {
            return async () => {
                return {
                    group: /(?<=assets\/)([\s\S]+?)(?=\/)/.exec(path)?.[0] || '',
                    name: /\/([^/]+)\./.exec(path.replace('../..', ''))?.[1] || '',
                    data: await import(path) as SvgIconData,
                }
            }
        })
        
        const res = await Promise.all(promises.map(fn => fn()))
        
        const groups = res.reduce<Record<string, typeof res>>((val, icon) => {
            if (val[icon.group]) {
                val[icon.group].push(icon)
            } else {
                val[icon.group] = [icon]
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

    const generateMoreSizeIcon = (icon:SvgIconData) => {
        const sizes = [8, 16, 24, 32, 46]
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
            {#await getIcons()}
                ...load
            {:then icons} 
                {#each icons as [group, groupedIcons] (group)}
                    <h3>/{group}</h3>
                    <ul>
                        {#each groupedIcons as {name, group, data} (name)}
                            <li transition:fade>
                                <b>/{name} <small>{JSON.stringify(data.size)}</small></b> 
                                <ul style='display: flex; gap: 10px; list-style: none'>
                                    {#each generateMoreSizeIcon(data) as {icon, size}}
                                        <li>
                                            <small>({size.width}/{size.height})px</small><br/>
                                            <Icon icon={icon} {...size}/>
                                        </li>
                                    {/each}
                                </ul>
                            </li>
                        {/each}
                    </ul>
                {/each}
            {/await}
        </div>
    </main>
</div>
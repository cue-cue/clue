<script lang='ts'>
    import {Icon, type ClueSvgIconData, type IconGroups} from '@clue/icons'
	import {TextField} from '@clue/base';
    import * as allIcons from '../iconsList.js'
    import VirtualScroll from "svelte-virtual-scroll-list"
	import { page } from '$app/stores';

    const getIcons = (group:keyof IconGroups):ClueSvgIconData[] => {
        return Object.values(allIcons).filter(icon => icon.groupName === group).map((icon, id) => ({...icon, id}))
    }

    let searchValue = ''

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
    $: icons = getIcons($page.params.group as keyof IconGroups).filter((icon) => icon.default.includes(searchValue)).map((icon, id) => ({...icon, id}))
</script>
<TextField placeholder='Search' bind:value={searchValue}/>
<br><br>
<div style='display: flex; justify-content: center; text-align: center'>
    {#if icons.length}
        <VirtualScroll
            data={icons}
            key='id'
            let:data={icon}
            pageMode={true}
        >
                <h4>{icon.name}</h4> 
                <ul style='display: flex; gap: 10px; list-style: none'>
                    {#each generateMoreSizeIcon(icon) as {icon:data, size}}
                        <li>
                            <small>({size.width}/{size.height})px</small><br/>
                            <Icon icon={data.default} {...size}/>
                        </li>
                    {/each}
                </ul>
        </VirtualScroll>
    {:else}
        <h3>Not found</h3>
    {/if}
</div>
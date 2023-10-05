<script lang='ts'>
    import {Icon, type ClueSvgIconData} from '@clue/icons'
	import {TextField} from '@clue/forms';
    import * as allIconsByList from '../iconsList.js'
    import VirtualScroll from "svelte-virtual-scroll-list"
	import { page } from '$app/stores';

    const allIcons = Object.values(allIconsByList).sort((a,b) => {
        if (a.name < b.name) {
            return -1
        }
        if (a.name > b.name) {
            return 1
        }
        return 0
    })

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

    $: icons = allIcons.filter((icon) => icon.groupName === $page.params.group &&  icon.name.includes(searchValue)).map((icon, id) => ({...icon, id}))
</script>
<div style="position: sticky; top: 16px">
    <TextField placeholder='Search' bind:value={searchValue} helper={`${icons.length} icons found`}/>
</div>
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
                            <small style='margin-bottom: 6px; display: block'>({size.width}/{size.height})px</small>
                            <Icon icon={data.default} {...size}/>
                        </li>
                    {/each}
                </ul>
        </VirtualScroll>
    {:else}
        <h3>Not found</h3>
    {/if}
</div>
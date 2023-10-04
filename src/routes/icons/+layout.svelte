<script lang='ts'>
	import type { ClueSvgIconData } from "$lib/packages/icons/src/index.js";
	import {Button} from "@clue/base";
    import lineIcon from '@clue/icons/line/pen-line.svg'

    const groups:{
        name: string
        icon: ClueSvgIconData['default']
    }[] = [
        {
            name: 'Line',
            icon: lineIcon
        }
    ]

</script>

<div>
    {#each groups as group (group)}
        <Button href={`/${group}`} size='small'>{group}</Button>
    {/each}
</div>
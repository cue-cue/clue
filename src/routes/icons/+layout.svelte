<script lang='ts'>
	import {Button} from "@clue/base";

    const groups = ['line', 'filled']

</script>

<div>
    {#each groups as group (group)}
        <Button href={`/${group}`} size='small'>{group}</Button>
    {/each}
</div>
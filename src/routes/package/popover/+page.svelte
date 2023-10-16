<script lang='ts'>
	import {Button} from "@clue/base"
    import { Popover } from "@clue/popover"

    
</script>

<h2>Popover</h2>

<Popover let:action placement='top'>
    <div use:action style='display: inline'>
        <Button>Popover</Button>
    </div>
    <svelte:fragment slot='content' let:action>
        <div style='background: red; color: #fff' use:action>
            <ul>
                <li></li>
            </ul>
        </div>
    </svelte:fragment>
</Popover>
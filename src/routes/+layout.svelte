<script lang='ts'>
    import Icon from "$lib/packages/icons/src/components/Icon/Icon.svelte";
import "$lib/packages/styles/src/index.sass"
    import "./styles/index.sass"
    import {calendar, eye} from '@clue/icons/line'
</script>

<header>
    <nav>
        <a href="/input"><Icon icon={eye}/>Input</a>
        <a href="/icons"><Icon icon={calendar}/>Icons</a>
    </nav>
    <hr>
</header>
<main>
    <slot/>
</main>
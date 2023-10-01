<script lang='ts'>
    import "$lib/packages/styles/src/index.sass"
    import "./styles/index.sass"
    import {Icon} from '@clue/icons'
    import * as eye from '@clue/icons/line/eye.svg'
    import * as calendar from '@clue/icons/line/calendar.svg'
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
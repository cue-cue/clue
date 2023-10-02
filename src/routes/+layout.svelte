<script lang='ts'>
    import "$lib/packages/styles/src/index.sass"
    import "./styles/index.sass"
    import {Icon} from '@clue/icons'
    import eye from '@clue/icons/line/eye.svg'
    import calendar from '@clue/icons/line/calendar.svg'
    import cross from '@clue/icons/line/cross.svg'
    
</script>

<header>
    <nav>
        <a href="/input"><Icon icon={eye}/>Input</a>
        <a href="/icons"><Icon icon={calendar}/>Icons</a>
        <a href="/button"><Icon icon={cross}/>Button</a>
    </nav>
    <hr>
</header>
<main>
    <slot/>
</main>
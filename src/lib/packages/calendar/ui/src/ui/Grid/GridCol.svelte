<script lang='ts'>
    interface $$Props {
        class?:string
    }
    
    let className = ''
    export { className as class }
    
</script>

<div class={`GridCol ${className}`}>
    <slot/>
</div>

<style lang='sass'>
    .GridCol
        display: grid
        grid-template-columns: 1fr
        gap: 8px
</style>
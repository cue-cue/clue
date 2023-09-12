<script lang='ts'>
    interface $$Props {
        class?:string
        content?:string
    }
    
    let className = ''
    export { className as class }
    export let content:$$Props['content'] = ''
</script>

<button class={`Button ${className}`}>
    <slot>{content}</slot>
</button>

<style>
    .Button {
        
    }
</style>
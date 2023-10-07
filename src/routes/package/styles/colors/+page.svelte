<script lang='ts'>
    const colors = ['aubergine', 'gray', 'mustard', 'sky', 'green', 'coral']

    const getVariants = (color:string) => {
        const values = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
        return values.map(value => {
            return {
                color,
                value,
                cssVar: `--clue-color-${color}-${value}`
            }
        })
    }

</script>

<h2>Colors</h2>
<ul>
    {#each colors as color (color)}
        <li>
            <h3>{color}</h3>
            <ul class='color-list'>
                {#each getVariants(color) as data (data.value)}
                    <li style:--color={`var(${data.cssVar})`}>
                        <h4>{data.value}</h4>
                    </li>
                {/each}
            </ul>
        </li>
    {/each}
</ul>

<style lang="sass">
    .color-list
        display: grid
        grid-template-columns: repeat(auto-fit, minmax(20px, 1fr))
        gap: 20px
        li
            list-style: none
            text-align: center
            &::before
                content: ''
                display: block
                width: 100%
                padding-bottom: 100%
                background: var(--color)
                border-radius: var(--clue-size-border-radius)
</style>
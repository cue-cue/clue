<script lang="ts">
	import { generateClassNames } from '@cluue/utils'
	import { Popover } from '@cluue/popover'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }
</script>

<Popover
	class={generateClassNames(['CalendarSelect', className])}
	trigger="click"
	placement="bottom"
>
	<button>
		<slot />
	</button>
	<svelte:fragment slot="content">
		<div>
			<slot name="content" />
		</div>
	</svelte:fragment>
</Popover>

<style lang="sass">
    button
        cursor: pointer
        background: none
        border: none
        font-weight: 500
        font-size: 16px
        padding: 0
    div
        background: #fff
        border-radius: 10px
        border: 1px solid var(--clue-color-gray-10)
        display: flex
        flex-direction: column
        list-style: none
        padding: 0
        margin: 0
        width: 160px
        max-height: 300px
        overflow: auto
</style>

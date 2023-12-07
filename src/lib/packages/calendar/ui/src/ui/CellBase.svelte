<script lang="ts">
	import { generateClassNames } from "@cluue/utils"

	interface $$Props {
		class?: string
		disabled?: boolean
	}

	let className = ''
	export { className as class }
	export let disabled:$$Props['disabled'] = false

</script>

<button class={generateClassNames(['CalendarCellBase', className])} {disabled}>
	<slot />
</button>

<style lang="sass">
	.ClueCalendarCellBase
		--calendar-cell-base-background-color: var(--clue-color-white)
		--calendar-cell-base-color: var(--clue-color-gray-700)
		--calendar-cell-base-border-radius: 12px

		display: flex
		align-items: center
		justify-content: center
		text-align: center
		border: none
		background: var(--calendar-cell-base-background-color)
		color: var(--calendar-cell-base-color)
		border-radius: var(--calendar-cell-base-border-radius)
		cursor: pointer
		font-weight: 500
		font-size: 14px
		&:disabled
			cursor: default
			opacity: .2
</style>

<script lang="ts">
	import { generateClassNames } from "@cluue/utils"

	interface $$Props {
		class?: string
		disabled?: boolean
		active?: boolean
		type?: 'negative'
	}

	let className = ''
	export { className as class }
	export let disabled:$$Props['disabled'] = undefined
	export let type:$$Props['type'] = undefined
	export let active:$$Props['active'] = undefined

</script>

<button	
	class={generateClassNames(['CalendarCellBase', className])}
	{disabled}
	data-active={active}
	data-type={type}
>
	<slot />
</button>

<style lang="sass">
	.ClueCalendarCellBase
		--calendar-cell-base-background-color: var(--clue-color-white)
		--calendar-cell-base-background-color-active: var(--clue-color-primary-400)
		--calendar-cell-base-background-color-disabled: var(--clue-color-gray-10)
		--calendar-cell-base-color: var(--clue-color-gray-700)
		--calendar-cell-base-color-active: var(--clue-color-white)
		--calendar-cell-base-border-radius: 12px
		//t-negative
		--calendar-cell-base-t-negative-background-color: var(--clue-color-negative-200)
		--calendar-cell-base-t-negative-background-color-active: var(--clue-color-negative-500)
		--calendar-cell-base-t-negative-color: var(--clue-color-negative-600)
		--calendar-cell-base-t-negative-color-active: var(--clue-color-white)

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
			background-color: var(--calendar-cell-base-background-color-disabled)
			cursor: default
		&[data-active='true']
			background-color: var(--calendar-cell-base-background-color-active)
			color: var(--calendar-cell-base-color-active)
		&[data-type='negative']
			--calendar-cell-base-background-color: var(--calendar-cell-base-t-negative-background-color)
			--calendar-cell-base-background-color-active: var(--calendar-cell-base-t-negative-background-color-active)
			--calendar-cell-base-color: var(--calendar-cell-base-t-negative-color)
			--calendar-cell-base-color-active: var(--calendar-cell-base-t-negative-color-active)
</style>

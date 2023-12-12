<script lang="ts">
	import { generateClassNames } from '@cluue/utils'

	interface $$Props {
		class?: string
		disabled?: boolean
		active?: boolean
		ghost?: boolean
		type?: 'negative'
		variant?: 'day' | 'time'
	}

	let className = ''
	export { className as class }
	export let disabled: $$Props['disabled'] = undefined
	export let type: $$Props['type'] = undefined
	export let active: $$Props['active'] = undefined
	export let ghost: $$Props['ghost'] = undefined
	export let variant: $$Props['variant'] = undefined
</script>

<button
	class={generateClassNames(['CalendarCellBase', className])}
	{disabled}
	data-ghost={ghost}
	data-active={active}
	data-type={type}
	data-variant={variant}
	on:click
>
	<slot />
</button>

<style lang="sass">
	.ClueCalendarCellBase
		--calendar-cell-base-width: 40px
		--calendar-cell-base-height: var(--calendar-cell-base-width)

		--calendar-cell-base-background-color: var(--clue-color-white)
		--calendar-cell-base-background-color-hover: var(--clue-color-gray-10)
		--calendar-cell-base-background-color-active: var(--clue-color-primary-400)
		--calendar-cell-base-background-color-active-hover: var(--clue-color-primary-500)
		--calendar-cell-base-background-color-disabled: var(--clue-color-gray-10)

		--calendar-cell-base-color: var(--clue-color-gray-700)
		--calendar-cell-base-color-hover:  var(--clue-color-gray-700)
		--calendar-cell-base-color-active-hover: var(--clue-color-white)
		--calendar-cell-base-color-active: var(--clue-color-white)
		--calendar-cell-base-color-disabled: var(--clue-color-gray-700)
		--calendar-cell-base-color-ghost: var(--clue-color-gray-200)

		--calendar-cell-base-border-color: transparent
		--calendar-cell-base-border-color-hover: transparent
		--calendar-cell-base-border-color-active: transparent
		--calendar-cell-base-border-color-active-hover: transparent
		--calendar-cell-base-border-color-disabled: transparent
		--calendar-cell-base-border-radius: 12px
		//t-negative
		--calendar-cell-base-t-negative-background-color: var(--clue-color-negative-200)
		--calendar-cell-base-t-negative-background-color-hover: var(--clue-color-negative-300)
		--calendar-cell-base-t-negative-background-color-active: var(--clue-color-negative-500)
		--calendar-cell-base-t-negative-background-color-active-hover: var(--clue-color-negative-600)
		--calendar-cell-base-t-negative-color: var(--clue-color-negative-600)
		--calendar-cell-base-t-negative-color-hover: var(--clue-color-negative-600)
		--calendar-cell-base-t-negative-color-active: var(--clue-color-white)
		--calendar-cell-base-t-negative-color-active-hover: var(--clue-color-white)

		display: flex
		align-items: center
		justify-content: center
		text-align: center
		border: none
		background: var(--calendar-cell-base-background-color)
		color: var(--calendar-cell-base-color)
		border-radius: var(--calendar-cell-base-border-radius)
		cursor: pointer
		width: var(--calendar-cell-base-width)
		height: var(--calendar-cell-base-height)
		border: 1px solid var(--calendar-cell-base-border-color)
		font-weight: 500
		font-size: 14px
		transition: .3s ease-in-out
		transition-property: color, background, border, border-radius
		&:disabled
			background-color: var(--calendar-cell-base-background-color-disabled)
			color: var(--calendar-cell-base-color-disabled)
			border-color: var(--calendar-cell-base-border-color-disabled)
			cursor: default
		&:not(:disabled)
			&:hover
				background-color: var(--calendar-cell-base-background-color-hover)
				color: var(--calendar-cell-base-color-hover)
				border-color: var(--calendar-cell-base-border-color-hover)
		&[data-active='true']
			background-color: var(--calendar-cell-base-background-color-active)
			color: var(--calendar-cell-base-color-active)
			border-color: var(--calendar-cell-base-border-color-active)
			&:not(:disabled)
				&:hover
					background-color: var(--calendar-cell-base-background-color-active-hover)
					color: var(--calendar-cell-base-color-active-hover)
					border-color: var(--calendar-cell-base-border-color-active-hover)
		&[data-type='negative']
			--calendar-cell-base-background-color: var(--calendar-cell-base-t-negative-background-color)
			--calendar-cell-base-background-color-hover: var(--calendar-cell-base-t-negative-background-color-hover)
			--calendar-cell-base-background-color-active: var(--calendar-cell-base-t-negative-background-color-active)
			--calendar-cell-base-background-color-active-hover: var(--calendar-cell-base-t-negative-background-color-active-hover)
			--calendar-cell-base-color: var(--calendar-cell-base-t-negative-color)
			--calendar-cell-base-color-hover: var(--calendar-cell-base-t-negative-color-hover)
			--calendar-cell-base-color-active: var(--calendar-cell-base-t-negative-color-active)
			--calendar-cell-base-color-active-hover: var(--calendar-cell-base-t-negative-color-active-hover)
		&[data-variant='time']
			--calendar-cell-base-width: 100%
			--calendar-cell-base-height: auto
			padding: 12px 7px
			--calendar-cell-base-border-color: var(--clue-color-gray-400)
			--calendar-cell-base-border-color-hover: var(--clue-color-gray-400)
			&[data-type='negative']
				--calendar-cell-base-border-color-hover: transparent
				--calendar-cell-base-border-color: transparent
		&:not([data-active='true'], [data-type='negative'])
			&[data-ghost='true']
				color: var(--calendar-cell-base-color-ghost)
</style>

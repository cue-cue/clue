<script lang="ts">
	import { generateClassNames } from '@cluue/utils'

	interface $$Props {
		class?: string
		disabled?: boolean
		active?: boolean
		ghost?: boolean
		type?: 'negative'
		variant?: 'day' | 'time' | 'unit'
		range?: Partial<Record<'end' | 'endOfWeek' | 'start' | 'startOfWeek' | 'in', boolean>>
	}

	let className = ''
	export { className as class }
	export let disabled: $$Props['disabled'] = undefined
	export let type: $$Props['type'] = undefined
	export let active: $$Props['active'] = undefined
	export let ghost: $$Props['ghost'] = undefined
	export let variant: $$Props['variant'] = undefined
	export let range: $$Props['range'] = undefined
</script>

<button class={generateClassNames(['CalendarCellBase', className])} {disabled} data-ghost={ghost} data-active={active} data-type={type} data-variant={variant} data-range-start={range?.start} data-range-start-of-week={range?.startOfWeek} data-range-in={range?.in} data-range-end={range?.end} data-range-end-of-week={range?.endOfWeek} on:click>
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
		//v-unit
		--calendar-cell-base-v-unit-border-radius: 5px

		--border-radius: var(--calendar-cell-base-border-radius)
		--background-color: var(--calendar-cell-base-background-color)
		--border-color: var(--calendar-cell-base-border-color)
		--color: var(--calendar-cell-base-color)

		position: relative
		isolation: isolate
		display: flex
		align-items: center
		justify-content: center
		text-align: center
		border: none
		background: none
		color: var(--color)
		cursor: pointer
		width: var(--calendar-cell-base-width)
		height: var(--calendar-cell-base-height)
		outline: var(--calendar-cell-base-border-color)
		font-weight: 500
		font-size: 14px
		transition: var(--clue-transition)
		transition-property: color
		&:disabled
			--background-color: var(--calendar-cell-base-background-color-disabled)
			--border-color: var(--calendar-cell-base-border-color-disabled)
			--color: var(--calendar-cell-base-color-disabled)
			cursor: default
		&:not(:disabled)
			&:hover
				--background-color: var(--calendar-cell-base-background-color-hover)
				--border-color: var(--calendar-cell-base-border-color-hover)
				--color: var(--calendar-cell-base-color-hover)
		&[data-active='true']
			--background-color: var(--calendar-cell-base-background-color-active)
			--border-color: var(--calendar-cell-base-border-color-active)
			--color: var(--calendar-cell-base-color-active)
			&:not(:disabled)
				&:hover
					--background-color: var(--calendar-cell-base-background-color-active-hover)
					--border-color: var(--calendar-cell-base-border-color-active-hover)
					--color: var(--calendar-cell-base-color-active-hover)
		&[data-type='negative']
			--calendar-cell-base-background-color: var(--calendar-cell-base-t-negative-background-color)
			--calendar-cell-base-background-color-hover: var(--calendar-cell-base-t-negative-background-color-hover)
			--calendar-cell-base-background-color-active: var(--calendar-cell-base-t-negative-background-color-active)
			--calendar-cell-base-background-color-active-hover: var(--calendar-cell-base-t-negative-background-color-active-hover)
			--calendar-cell-base-color: var(--calendar-cell-base-t-negative-color)
			--calendar-cell-base-color-hover: var(--calendar-cell-base-t-negative-color-hover)
			--calendar-cell-base-color-active: var(--calendar-cell-base-t-negative-color-active)
			--calendar-cell-base-color-active-hover: var(--calendar-cell-base-t-negative-color-active-hover)
		&[data-variant='unit']
			padding: 6px 7px
			--calendar-cell-base-width: 100%
			--calendar-cell-base-height: auto
			--calendar-cell-base-border-radius: var(--calendar-cell-base-v-unit-border-radius)
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
		&:not([data-range-end='true'])
			&[data-range-start='true']
				&::before
					border-top-right-radius: 0px
					border-bottom-right-radius: 0px
					right: -6px
					width: calc(100% + 6px)
		&:not([data-range-start='true'])
			&[data-range-end='true']
				&::before
					border-top-left-radius: 0px
					border-bottom-left-radius: 0px
					left: -6px
					width: calc(100% + 6px)
		&[data-range-in='true']
			--border-radius: 0
			--color: var(--calendar-cell-base-color)
			--background-color: var(--calendar-cell-base-background-color-disabled)
			&::before
				left: -6px
				width: calc(100% + 12px)
			&[data-range-start-of-week='true']
				&::before
					left: 0
					right: -6px
					width: calc(100% + 6px)
			&[data-range-end-of-week='true']
				&::before
					right: 0
					left: -6px
					width: calc(100% + 6px)
		&::before
			content: ''
			display: block
			position: absolute
			z-index: -1
			top: 0
			left: 0
			width: 100%
			height: 100%
			border-radius: var(--border-radius)
			background: var(--background-color)
			outline: 1px solid var(--border-color)
			transition: var(--clue-transition)
			transition-property: background, outline, border-radius, right, left, width
</style>

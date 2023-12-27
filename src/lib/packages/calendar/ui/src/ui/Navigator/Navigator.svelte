<script lang="ts">
	import dayjs from 'dayjs'
	import { generateClassNames } from '@cluue/utils'
	import NavigatorArrow from './NavigatorArrow.svelte'
	import { CalendarContext } from '../../lib/context.js'
	import NavigatorControl from './NavigatorControl.svelte'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }

	const {
		store: { navigator, options },
	} = new CalendarContext().get()

	const handler = {
		arrowPrev() {
			navigator.prev()
		},
		arrowNext() {
			navigator.next()
		},
		month() {
			if ($navigator.unit === 'month') {
				navigator.goto('date')
			} else {
				navigator.goto('month')
			}
		},
		year() {
			if ($navigator.unit === 'year') {
				navigator.goto('date')
			} else {
				navigator.goto('year')
			}
		},
	}

	$: isArrowHidden = !['date', 'year'].includes($navigator.unit)
</script>

<div class={generateClassNames(['CalendarNavigator', className])}>
	<NavigatorArrow on:click={handler.arrowPrev} hidden={isArrowHidden} />
	<div>
		<NavigatorControl on:click={handler.month} active={$navigator.unit === 'month'}>
			{dayjs($navigator.viewDate).format($options.formats?.month)}
		</NavigatorControl>
		<NavigatorControl on:click={handler.year} active={$navigator.unit === 'year'}>
			{dayjs($navigator.viewDate).format($options.formats?.year)}
		</NavigatorControl>
	</div>
	<NavigatorArrow type="next" on:click={handler.arrowNext} hidden={isArrowHidden} />
</div>

<style lang="sass">
    .ClueCalendarNavigator
        display: flex
        align-items: center
        justify-content: space-between
        padding: 8px 10px
        div
            display: flex
            align-items: center
            margin: 0 auto
</style>

<script lang="ts" generics="TRange extends boolean = false">
	import { config } from '@cluue/config'

	import { slide } from 'svelte/transition'

	import Year from '../Year/Year.svelte'

	import { createCalendarStore, type ICalendarStoreData, type ICalendarStoreOptionsData } from '../../lib/index.js'
	import { generateClassNames } from '@cluue/utils'
	import { Cell as CalendarCoreCell, type ICalendarParams, type ISelectOptions, type ISelectParams } from '@cluue/calendar-core'
	import Navigator from '../Navigator/Navigator.svelte'
	import PickerContainer from './PickerContainer.svelte'
	import { CalendarContext, type ICalendarContextData } from '../../lib/context.js'
	import DaysNavigator from '../Days/DaysNavigator.svelte'
	import Days from '../Days/Days.svelte'
	import Time from '../Time/Time.svelte'
	import { beforeUpdate } from 'svelte'
	import Month from '../Month/Month.svelte'

	type CalendarStoreOptions = ICalendarStoreOptionsData<TRange>
	interface $$Props extends ICalendarParams {
		class?: string
		value?: ICalendarStoreData<{ range: TRange }>['date']
		time?: CalendarStoreOptions['time']
		range?: CalendarStoreOptions['range']
		select?: CalendarStoreOptions['select']
	}

	let className = ''
	export { className as class }
	export let value: $$Props['value'] = undefined
	export let time: $$Props['time'] = false
	export let range: $$Props['range'] = false as TRange
	export let periods: $$Props['periods'] = undefined
	export let blocks: $$Props['blocks'] = undefined
	export let disabled: $$Props['disabled'] = undefined
	export let select: $$Props['select'] = undefined

	const calendarStore = createCalendarStore({
		time,
		range,
		select,
		calendar: {
			blocks,
			disabled,
			periods
		},
		initialDate: value,
		on: {
			set(date) {
				value = date
			}
		}
	})

	const navigator = calendarStore.navigator

	$: calendarStore.options.update({
		select,
		time,
		range
	})

	$: calendarStore.calendar.setBlocks(blocks)
	$: calendarStore.calendar.setPeriods(periods)
	$: calendarStore.calendar.setDisabled(disabled)

	new CalendarContext().set({
		store: calendarStore as ICalendarContextData['store']
	})

	beforeUpdate(() => {
		if ($calendarStore.date && value) {
			if (range && !(value instanceof Date) && !($calendarStore.date instanceof Date)) {
				if (CalendarCoreCell.isSame(new CalendarCoreCell(value), $calendarStore.date)) return
			} else {
				if (+value === +$calendarStore.date) return
			}
		} else {
			calendarStore.select(value, {
				overload: true
			})
		}
	})

	const toggleRange = () => (range = !range as TRange)
	const toggleTime = () => (time = !time)
</script>

<pre style="height: 100px">{JSON.stringify($calendarStore, null, 2)}</pre>
<pre style="height: 120px">{JSON.stringify($navigator, null, 2)}</pre>
<button on:click={toggleTime}>toggle time ({time})</button>
<button on:click={toggleRange}>toggle range ({range})</button>
<div class={generateClassNames(['CalendarPicker', className])}>
	<PickerContainer>
		<Navigator />
		{#if $navigator.unit === 'date'}
			<div transition:slide={$config.transition} class={generateClassNames(['CalendarPicker__days'])}>
				<DaysNavigator />
			</div>
		{/if}
	</PickerContainer>
	<div class={generateClassNames(['CalendarPicker__main'])}>
		<PickerContainer>
			{#if $navigator.unit === 'month'}
				<Month />
			{:else if $navigator.unit === 'year'}
				<Year />
			{:else if time}
				<Time />
			{:else}
				<Days />
			{/if}
		</PickerContainer>
	</div>
</div>

<style lang="sass">
	.ClueCalendarPicker
		background: var(--clue-color-white)
		box-shadow: 2px 2px 12px 4px rgba(0, 0, 0, .16)
		padding-top: 10px
		border-radius: 20px
		width: 384px
		&__days
			width: 100%
			padding-bottom: 8px
			border-bottom: 1px solid var(--clue-color-gray-10)
		&__main
			padding-top: 24px
			padding-bottom: 20px
			max-height: 400px
			overflow: auto

</style>

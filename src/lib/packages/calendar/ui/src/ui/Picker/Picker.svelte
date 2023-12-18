<script lang="ts" generics="TRange extends boolean = false">
	import { generateClassNames, randomId } from '@cluue/utils'
	import { Cell as CalendarCoreCell } from '@cluue/calendar-core'
	import PickerNavigator from './PickerNavigator.svelte'
	import PickerContainer from './PickerContainer.svelte'
	import { CalendarContext, type ICalendarContextData } from '../../lib/context.js'
	import { createCalendarStore, type ICalendarStoreData, type ICalendarStoreOptions } from '../../lib/store.js'
	import DaysNavigator from '../Days/DaysNavigator.svelte'
	import Days from '../Days/Days.svelte'
	import Time from '../Time/Time.svelte'
	import DaysNames from '../Days/DaysNames.svelte'
	import { afterUpdate, beforeUpdate } from 'svelte'

	type CalendarStoreOptions = ICalendarStoreOptions<TRange>
	interface $$Props {
		class?: string
		value?: ICalendarStoreData<{ range: TRange }>['date']
		time?: CalendarStoreOptions['time']
		range?: CalendarStoreOptions['range']
	}

	let className = ''
	export { className as class }
	export let value: $$Props['value'] = undefined
	export let time: $$Props['time'] = false
	export let range: $$Props['range'] = false as TRange

	const calendarStore = createCalendarStore({
		time,
		range,
		initData: {
			date: value
		},
		on: {
			set(date) {
				if (date instanceof Date) {
					value
				}
				value = date
			}
		}
	})

	$: calendarStore.options.update({
		time,
		range
	})

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
		}
		calendarStore.select(value, {
			new: true
		})
	})
</script>

<pre style="height: 100px">{JSON.stringify($calendarStore, null, 2)}</pre>
<button on:click={() => (time = !time)}>toggle time ({time})</button>
<button on:click={() => (range = !range)}>toggle range ({range})</button>
<div class={generateClassNames(['CalendarPicker', className])}>
	<PickerContainer>
		<PickerNavigator />
		{#if time}
			<DaysNavigator />
		{:else}
			<DaysNames />
		{/if}
	</PickerContainer>
	<div class={generateClassNames(['CalendarPicker__main', className])}>
		<PickerContainer>
			{#if time}
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
		width: fit-content
		&__main
			--padding-top: 24px
			--padding-bottom: 20px
			--margin-top: 8px
			border-top: 1px solid var(--clue-color-gray-10)
			padding-top: var(--padding-top)
			padding-bottom: var(--padding-bottom)
			margin-top: var(--margin-top)
			max-height: 400px
			overflow: auto
</style>

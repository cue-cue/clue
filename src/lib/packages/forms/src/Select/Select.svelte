<script lang='ts'>
	import { fly } from 'svelte/transition'

	import type { IOption } from './types.js'

	import {generateClassNames, outclick} from '@clue/utils'
	import SelectBase from './SelectBase.svelte'
	import type { ComponentProps } from 'svelte'
	import SelectOptionList from './SelectOptionList.svelte'

	
	type T = $$Generic<IOption<any>[]>
	type U = $$Generic<boolean>

	type SelectBaseProps = ComponentProps<SelectBase>
	type SelectOptionListProps = ComponentProps<SelectOptionList<T, U>>

	type SearchFilter = (option:T[number], searchValue:string) => boolean

	interface $$Props extends Omit<SelectOptionListProps, 'filter'> {
		class?:string
		opened?:boolean
		allowSearch?:SelectBaseProps['allowSearch']
		searchFilter?:SearchFilter
	}
	
	let className = ''
	export { className as class }
	export let opened:$$Props['opened'] = false
	export let options:$$Props['options']
	export let multiple:$$Props['multiple'] = false as U
	export let value:$$Props['value'] = undefined
	export let allowSearch:$$Props['allowSearch'] = false
	export let searchFilter:$$Props['searchFilter'] = undefined

	let searchValue:SelectBaseProps['searchValue'] = ''

	let close:SelectBaseProps['close']
	let open:SelectBaseProps['open']
	let toggle:SelectBaseProps['toggle']
	
	const handler = {
		outclick() {
			close?.()
		}
	}

	const getInputValue = (value:$$Props['value']) => {
		if (Array.isArray(value)) {
			return value.join(', ')
		}
		return value
	}
	let inputValue = getInputValue(value)
	$: inputValue = getInputValue(value)

	$: filter = (option:IOption<any>) => {
		if (!allowSearch) return true
		if (searchFilter) {
			return searchFilter(option, searchValue || '')
		} else if (!searchValue) {
			return true
		}
		return !!option.label?.toLowerCase().includes(searchValue.toLowerCase())
	}

</script>
<small>
	opened: {opened}<br>
	multiple: {multiple}<br>
	allowSearch: {allowSearch}<br>
	value ({typeof value === 'object' ? 'array' : typeof value}): {value}
</small>
<div
	class={generateClassNames(['Select', className])}
	use:outclick
	on:outclick={handler.outclick}
>
	<SelectBase
		bind:close
		bind:open
		bind:toggle
		{allowSearch}
		bind:value={inputValue}
		bind:searchValue
		bind:opened
		on:open
	/>
	{#if opened}
		<div transition:fly={{duration: 200, y: -20}}>
			<SelectOptionList {filter} {options} {multiple} bind:value/>
		</div>
	{/if}
</div>

<style lang='sass'>
	.ClueSelect
		:global(.ClueSelectOptionList)
			max-height: min(400px, 80vh)
</style>
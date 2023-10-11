<script lang='ts'>
	import SelectOptionListCore from './SelectOptionListCore.svelte'

	import SelectOptionList from './SelectOptionList.svelte'

	import { config } from '$lib/packages/config.js'

	import { fly } from 'svelte/transition'

	import type { IOption } from './types.js'

	import {generateClassNames, outclick} from '@clue/utils'
	import SelectBase from './SelectBase.svelte'
	import type { ComponentProps } from 'svelte'

	
	type T = $$Generic<IOption<any>[]>
	type U = $$Generic<boolean>

	type SelectBaseProps = ComponentProps<SelectBase>
	type SelectOptionListCoreProps = ComponentProps<SelectOptionListCore<T, U>>

	type SearchFilter = (option:T[number], searchValue:string) => boolean

	interface $$Props extends Omit<SelectOptionListCoreProps, 'filter'> {
		class?:string
		opened?:boolean
		allowSearch?:SelectBaseProps['allowSearch']
		allowClear?:SelectBaseProps['allowClear']
		searchFilter?:SearchFilter
	}
	
	let className = ''
	export { className as class }
	export let opened:$$Props['opened'] = false
	export let options:$$Props['options']
	export let multiple:$$Props['multiple'] = false as U
	export let value:$$Props['value'] = undefined
	export let allowSearch:$$Props['allowSearch'] = false
	export let allowClear:$$Props['allowClear'] = true
	export let searchFilter:$$Props['searchFilter'] = undefined
	export let clear:$$Props['clear'] = undefined

	let searchValue:SelectBaseProps['searchValue'] = ''

	let close:SelectBaseProps['close']
	let open:SelectBaseProps['open']
	let toggle:SelectBaseProps['toggle']
	
	const handler = {
		outclick() {
			close?.()
		},
		clear() {
			clear?.()
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
		{allowSearch}
		{allowClear}
		bind:close
		bind:open
		bind:toggle
		bind:value={inputValue}
		bind:searchValue
		bind:opened
		on:open
		on:close
		on:toggle
		on:clear={handler.clear}
	/>

	<SelectOptionListCore {options} {filter} bind:clear bind:value {multiple} {...$$restProps}>
		{#if opened}
			<div transition:fly={{...$config.transition, y: -20}}>
				<SelectOptionList/>
			</div>
		{/if}
	</SelectOptionListCore>
</div>

<style lang='sass'>
	.ClueSelect
		:global(.ClueSelectOptionList)
			max-height: min(400px, 80vh)
</style>
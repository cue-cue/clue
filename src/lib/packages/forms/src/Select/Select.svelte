<script lang='ts'>
	import SelectOptionListCore from './SelectOptionListCore.svelte'

	import SelectOptionList from './SelectOptionList.svelte'

	import { config } from '$lib/packages/config.js'

	import { fly } from 'svelte/transition'

	import type { IOption } from './types.js'

	import {generateClassNames, outclick} from '@clue/utils'
	import SelectBase from './SelectBase.svelte'
	import type { ComponentProps } from 'svelte'
	import TextField from '../TextField/TextField.svelte'

	
	type T = $$Generic<IOption<any>[]>
	type U = $$Generic<boolean>

	type SelectBaseProps = ComponentProps<SelectBase>
	type SelectOptionListCoreProps = ComponentProps<SelectOptionListCore<T, U>>
	type TextFieldProps = ComponentProps<TextField>

	type SearchFilter = (option:T[0], searchValue:string) => boolean
	interface $$Props extends Pick<SelectOptionListCoreProps, 'options' | 'multiple' | 'value' | 'disabled' | 'readonly' | 'key'>, Pick<SelectBaseProps, 'opened' | 'allowSearch' | 'allowClear' | 'error'>, Pick<TextFieldProps, 'label' | 'helper' | 'hint'> {
		class?:string
		searchFilter?:SearchFilter
	}
	
	let className = ''
	export { className as class }
	export let opened:$$Props['opened'] = false
	export let options:$$Props['options']
	export let multiple:$$Props['multiple'] = false as U
	export let value:$$Props['value'] = undefined
	export let allowSearch:$$Props['allowSearch'] = false
	export let disabled:$$Props['disabled'] = false
	export let readonly:$$Props['readonly'] = false
	export let error:$$Props['error'] = false
	export let searchFilter:$$Props['searchFilter'] = undefined
	export let key:$$Props['key'] = undefined
	export let label:$$Props['label'] = undefined
	export let helper:$$Props['helper'] = undefined
	export let hint:$$Props['hint'] = undefined

	let searchValue:SelectBaseProps['searchValue'] = ''

	let close:SelectBaseProps['close']
	let open:SelectBaseProps['open']
	let toggle:SelectBaseProps['toggle']

	let clear:SelectOptionListCoreProps['clear']
	
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
	disabled: {disabled}<br>
	readonly: {readonly}<br>
	key: {key || 'id'}<br>
	error: {error}<br>
	value ({typeof value === 'object' ? 'array' : typeof value}): {value}
</small>
<div
	class={generateClassNames(['Select', className])}
	use:outclick
	on:outclick={handler.outclick}
>
	<TextField {disabled} {error} {readonly} {label} {helper} {hint}>
		<svelte:fragment slot='base' let:id>
			<SelectBase
				{allowSearch}
				{disabled}
				{readonly}
				{error}
				{id}
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
		</svelte:fragment>
	</TextField>

	<SelectOptionListCore {options} {readonly} {disabled} {key} {filter} {multiple} bind:clear bind:value>
		{#if opened}
			<div transition:fly={{...$config.transition, y: -20}}>
				<SelectOptionList/>
			</div>
		{/if}
	</SelectOptionListCore>
</div>

<style lang='sass'>
	.ClueSelect
		position: relative
		:global(.ClueSelectOptionList)
			max-height: min(400px, 80vh)
			width: 100%
			position: absolute
			bottom: 0
			left: 0
			transform: translateY(100%)
			z-index: 100
</style>
<script lang='ts'>
	import { getOptionValueKey } from './utils.js'

	import SelectOptionListCore from './SelectOptionListCore.svelte'

	import SelectOptionList from './SelectOptionList.svelte'

	import { config } from '$lib/packages/config.js'

	import { fly } from 'svelte/transition'

	import type { IOption, OptionValue, OptionValueKey } from './types.js'

	import {generateClassNames, outclick} from '@clue/utils'
	import SelectBase from './SelectBase.svelte'
	import type { ComponentProps } from 'svelte'
	import TextField from '../TextField/TextField.svelte'

	
	type OptionsGeneric = $$Generic<IOption<any>[]>
	type MultipleGeneric = $$Generic<boolean>
	type ValueTypeGeneric = $$Generic<'key' | 'advanced'>
	type KeyGeneric = $$Generic<OptionValueKey<OptionsGeneric[number]['value']>>

	type SelectBaseProps = ComponentProps<SelectBase>
	type SelectOptionListCoreProps = ComponentProps<SelectOptionListCore<OptionsGeneric, MultipleGeneric, ValueTypeGeneric, KeyGeneric>>
	type TextFieldProps = ComponentProps<TextField>

	type SearchFilter = (option:OptionsGeneric[number], searchValue:string) => boolean
	interface $$Props extends Pick<SelectOptionListCoreProps, 'options' | 'valueType' | 'multiple' | 'value' | 'disabled' | 'readonly' | 'key'>, Pick<SelectBaseProps, 'opened' | 'allowSearch' | 'allowClear' | 'error'>, Pick<TextFieldProps, 'label' | 'helper' | 'hint'> {
		class?:string
		searchFilter?:SearchFilter
	}
	
	let className = ''
	export { className as class }
	export let opened:$$Props['opened'] = false
	export let options:$$Props['options']
	export let multiple:$$Props['multiple'] = false as MultipleGeneric
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
	export let valueType:$$Props['valueType'] = undefined

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
		const foundOptions = options.filter(option => {
			if (Array.isArray(value)) {
				return value.some((val: OptionsGeneric[number]["value"]) => getOptionValueKey(option.value, key) === getOptionValueKey(val, key))
			}
			return getOptionValueKey(option.value, key) === getOptionValueKey(value as OptionValue, key)
		})
		const labels = foundOptions.map(({label}) => label)
		return labels.join(', ')
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
	allowClear: {$$restProps.allowClear || true}<br>
	disabled: {disabled}<br>
	readonly: {readonly}<br>
	key: {key || 'id'}<br>
	valueType: {valueType || 'key'}<br>
	error: {error}<br>
	value {JSON.stringify(value)}
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

	<SelectOptionListCore {valueType} {options} {readonly} {disabled} {key} {filter} {multiple} bind:clear bind:value>
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
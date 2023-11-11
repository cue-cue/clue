<script lang='ts' generics="
	OptionsGeneric extends OptionsGenericType,
	ValueTypeGeneric extends ValueTypeGenericType = 'key',
	KeyGeneric extends KeyGenericType = 'id',
	MultipleGeneric extends MultipleGenericType = false
">
	import {PopoverContent} from '@cluue/popover'

	import { getOptionValueKey } from './utils.js'

	import SelectOptionListCore, {type OptionsGenericType, type ValueTypeGenericType, type KeyGenericType, type MultipleGenericType} from './SelectOptionListCore.svelte'

	import SelectOptionList from './SelectOptionList.svelte'

	import type { IOption, OptionValue } from './types.js'

	import {createAction, generateClassNames, outclick} from '@cluue/utils'
	import SelectBase from './SelectBase.svelte'
	import type { ComponentProps } from 'svelte'
	import TextField from '../TextField/TextField.svelte'
	import {Popover} from '@cluue/popover'

	type SelectBaseProps = ComponentProps<SelectBase>
	type SelectOptionListCoreProps = ComponentProps<SelectOptionListCore<OptionsGeneric, ValueTypeGeneric, KeyGeneric, MultipleGeneric>>
	type TextFieldProps = ComponentProps<TextField>

	type SearchFilter = (option:OptionsGeneric[number], searchValue:string) => boolean
	interface $$Props extends Pick<SelectOptionListCoreProps, 'options' | 'valueType' | 'multiple' | 'value' | 'disabled' | 'readonly' | 'key'>, Pick<SelectBaseProps, 'open' | 'allowSearch' | 'allowClear' | 'error'>, Pick<TextFieldProps, 'label' | 'helper' | 'hint'> {
		class?:string
		searchFilter?:SearchFilter
	}
	
	let className = ''
	export { className as class }
	export let open:$$Props['open'] = false
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

	let setOpen:SelectBaseProps['setOpen']
	let clear:SelectOptionListCoreProps['clear']
	
	const handler = {
		outclick() {
			setOpen?.(false)
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
	open: {open}<br>
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
	<Popover placement='bottom' offset={0} trigger={false} bind:open>
		<svelte:fragment slot='target' let:targetAction>
			<TextField {disabled} {error} {readonly} {label} {helper} {hint}>
				<svelte:fragment slot='base' let:id>
					<SelectBase
						{allowSearch}
						{disabled}
						{readonly}
						{error}
						{id}
						use={[
							createAction('targetAction', targetAction)
						]}
						bind:open
						bind:value={inputValue}
						bind:searchValue
						bind:setOpen
						on:open
						on:close
						on:toggle
						on:clear={handler.clear}
					/>
				</svelte:fragment>
			</TextField>
		</svelte:fragment>
		<svelte:fragment slot='content-wrapper' let:open>
			<SelectOptionListCore {valueType} {options} {readonly} {disabled} {key} {filter} {multiple} bind:clear bind:value>
				{#if open}
					<PopoverContent class={generateClassNames(['SelectPopoverContent', className])}>
						<SelectOptionList/>
					</PopoverContent>
				{/if}
			</SelectOptionListCore>
		</svelte:fragment>
	</Popover>
</div>

<style lang='sass'>
	.ClueSelect
		position: relative
		:global(.ClueSelectOptionList)
			max-height: min(400px, 80vh)
			width: 100%
		:global(.CluePopoverTarget)
			width: 100%
	:global(.ClueSelectPopoverContent)
		width: 100%
</style>
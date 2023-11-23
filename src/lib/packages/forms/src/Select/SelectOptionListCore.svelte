<script lang="ts" context="module">
	import type { IOption, ISelectOptionListCoreData, OptionValue } from './types.js'

	/* eslint-disable @typescript-eslint/no-explicit-any */
	export type OptionsGenericType = IOption<any>[]
	export type MultipleGenericType = boolean
	export type ValueTypeGenericType = 'key' | 'advanced'
	export type KeyGenericType = string
</script>

<script
	lang="ts"
	generics="
	OptionsGeneric extends OptionsGenericType,
	ValueTypeGeneric extends ValueTypeGenericType = 'key',
	KeyGeneric extends KeyGenericType = 'id',
	MultipleGeneric extends MultipleGenericType = false
"
>
	import { writable } from 'svelte/store'
	import { selectOptionListCoreContext } from './context.js'
	import { getOptionValueKey as _getOptionValueKey } from './utils.js'

	type OptionGenericValue = ValueTypeGeneric extends 'advanced'
		? OptionsGeneric[number]['value']
		: OptionsGeneric[number]['value'][KeyGeneric]

	type Value<T extends boolean> = T extends true
		? OptionGenericValue[]
		: OptionGenericValue | undefined
	interface $$Props {
		class?: string
		key?: KeyGeneric
		multiple?: MultipleGeneric
		options: OptionsGeneric
		valueType?: ValueTypeGeneric
		value?: Value<MultipleGeneric>
		filter?: ((option: OptionsGeneric[number]) => boolean) | string
		disabled?: boolean
		readonly?: boolean
	}

	type Data = ISelectOptionListCoreData<OptionsGeneric>[]

	interface $$Slots {
		default: {
			data: Data
			multiple?: MultipleGeneric
		}
	}

	export let key: $$Props['key'] = undefined
	export let multiple: $$Props['multiple'] = false as MultipleGeneric
	export let options: $$Props['options']
	export let value: $$Props['value'] = (multiple ? [] : undefined) as unknown as $$Props['value']
	export let filter: $$Props['filter'] = undefined
	export let disabled: $$Props['disabled'] = undefined
	export let readonly: $$Props['readonly'] = undefined
	export let valueType: $$Props['valueType'] = 'key' as ValueTypeGeneric

	const getOptionValueKey = (value: OptionValue) => {
		return _getOptionValueKey(value, key)
	}

	const valueTransformer = <T extends OptionGenericValue>(
		value: T
	): ReturnType<typeof getOptionValueKey> | T => {
		if (value === undefined) return value
		if (typeof value === 'object') {
			if (valueType === 'advanced') {
				return value
			} else {
				return getOptionValueKey(value)
			}
		}
		return getOptionValueKey(value)
	}

	const isOptionInValue = (option: OptionsGeneric[number], value?: $$Props['value']) => {
		if (value === undefined) return false

		const optionKey = getOptionValueKey(valueTransformer(option.value))

		if (multiple) {
			if (!(value as Value<true>)?.length) return false
			if (Array.isArray(value)) {
				return (
					value.findIndex((val: OptionGenericValue) => {
						return getOptionValueKey(valueTransformer(val)) === optionKey
					}) !== -1
				)
			}
		} else {
			return getOptionValueKey(valueTransformer(value as OptionGenericValue)) === optionKey
		}
		return false
	}

	export const set = <T extends boolean>(newValue: Value<T>) => {
		if (multiple) {
			;(value as Value<true>) = Array.isArray(newValue)
				? newValue.map((val: OptionGenericValue) => valueTransformer(val))
				: [valueTransformer(newValue as OptionGenericValue)]
		} else {
			;(value as Value<false>) = valueTransformer(
				newValue as OptionGenericValue
			) as OptionGenericValue
		}
	}

	export const clear = () => {
		if (multiple) {
			set([])
		} else {
			set(undefined)
		}
	}

	export const add = (option: OptionsGeneric[number]) => {
		if (multiple) {
			if (!value || !Array.isArray(value)) {
				set(option.value)
			} else {
				set([...value, option.value])
			}
		} else {
			set(option.value)
		}
	}

	export const remove = (option: OptionsGeneric[number]) => {
		const optionInValue = isOptionInValue(option, value)

		if (multiple) {
			if (!value || !Array.isArray(value)) {
				clear()
			} else if (Array.isArray(value)) {
				if (optionInValue) {
					set(
						value.filter(
							(val: OptionGenericValue) =>
								getOptionValueKey(val) !== getOptionValueKey(option.value)
						)
					)
				}
			}
		} else {
			if (optionInValue) {
				clear()
			}
		}
	}

	const handler = {
		optionClick(option: OptionsGeneric[number]) {
			if (disabled || readonly) return
			const double = isOptionInValue(option, value)
			if (double) {
				remove(option)
			} else {
				add(option)
			}
		}
	}

	const isActive = (option: OptionsGeneric[number], _value: typeof value): boolean => {
		return isOptionInValue(option, _value)
	}

	$: data = (() => {
		let _options = options

		if (filter) {
			switch (typeof filter) {
				case 'function': {
					_options = _options.filter(filter) as typeof _options
					break
				}
				case 'string': {
					_options = _options.filter((option) => option.label === filter) as typeof _options
				}
			}
		}

		return _options.map((option: OptionsGeneric[number]): Data[number] => {
			const clickHandler = () => {
				handler.optionClick(option)
			}
			return {
				option,
				clickHandler,
				label: option.label || '',
				key: getOptionValueKey(option.value),
				active: isActive(option, value)
			}
		})
	})()

	const selectOptionListCoreContextStore = selectOptionListCoreContext.set(
		writable({
			data
		})
	)

	$: selectOptionListCoreContextStore.set({
		data
	})
</script>

<slot {data} {multiple} />

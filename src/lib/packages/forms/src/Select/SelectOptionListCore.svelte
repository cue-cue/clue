<script lang='ts'>
	import { writable } from "svelte/store"
	import { selectOptionListCoreContext } from "./context.js"
	import type { IOption, ISelectOptionListCoreData } from "./types.js"

	type OptionsGeneric = $$Generic<IOption<any>[]>
	type MultipleGeneric = $$Generic<boolean>
	
	type ValueOne = OptionsGeneric[number]['value']

	type Value<T extends boolean> = T extends true ? ValueOne[] : ValueOne

	interface $$Props {
		class?:string
		key?:string
		multiple?:MultipleGeneric
		options:OptionsGeneric
		value?:Value<MultipleGeneric>
		filter?:((option:OptionsGeneric[number]) => boolean) | string
	}

	type Data = ISelectOptionListCoreData<OptionsGeneric>[]
	

	interface $$Slots {
		default: {
			data: Data
			multiple?:MultipleGeneric
		}
	}

	export let key:$$Props['key'] = 'value'
	export let multiple:$$Props['multiple'] = false as MultipleGeneric
	export let options:$$Props['options']
	export let value:$$Props['value'] = (multiple ? [] : undefined) as unknown as $$Props['value']
	export let filter:$$Props['filter'] = undefined

	const getOptionKey = ({value}:Pick<OptionsGeneric[number], 'value'>) => {
		const _key = key || 'value'
		if (_key === 'value') {
			return value
		}
		return value
	}

	const isOptionInValue = (option:OptionsGeneric[number], value:$$Props['value']) => {
		if (value === undefined) return false
		const optionKey = getOptionKey(option)
		if (multiple) {
			if (!value?.length) return false
			if (Array.isArray(value)) {
				return value.findIndex((val:ValueOne) => getOptionKey({value: val}) === optionKey) !== -1
			}
		} else {
			return getOptionKey({value}) === getOptionKey(option)
		}
		return false
	}
	
	export const set = (newValue:typeof value) => {
		if (multiple) {
			value = Array.isArray(newValue) ? newValue : [newValue]
		} else {
			value = newValue
		}
	}

	export const clear = () => {
		if (multiple) {
			set([])
		} else {
			set(undefined)
		}
	}

	export const add = (option:OptionsGeneric[number]) => {
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

	export const remove = (option:OptionsGeneric[number]) => {
		const optionInValue = isOptionInValue(option, value)

		if (multiple) {
			if (!value || !Array.isArray(value)) {
				clear()
			} else if (Array.isArray(value)) {
				if (optionInValue) {
					set(value.filter((val:ValueOne) => getOptionKey({value:val}) !== getOptionKey(option)))
				}
			}
		} else {
			if (optionInValue) {
				clear()
			}
		}
	}

	const handler = {
		optionClick(option:OptionsGeneric[number]) {
			const double = isOptionInValue(option, value)
			if (double) {
				remove(option)
			} else {
				add(option)
			}
		}
	}

	const isActive = (option:OptionsGeneric[number], _value:typeof value):boolean => {
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
					_options = _options.filter(option => option.label === filter) as typeof _options
				}
			}
		}

		return _options.map((option:OptionsGeneric[number]):Data[number] => {
			const clickHandler = () => {
				handler.optionClick(option)
			}
			return {
				option,
				clickHandler,
				label: option.label || '',
				key: getOptionKey(option),
				active: isActive(option, value)
			}
		})
	})()
	
	const selectOptionListCoreContextStore = selectOptionListCoreContext.set(writable({
		data
	}))

	$: selectOptionListCoreContextStore.set({
		data
	})

</script>

<slot {data} multiple={multiple}/>
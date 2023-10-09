<script lang='ts'>
	import type { IOption } from "./types.js"

	type OptionsGeneric = $$Generic<IOption[]>
	type MultipleGeneric = $$Generic<boolean>
	
	type ValueOne = OptionsGeneric[number]['value']

	type Value<T extends boolean> = T extends true ? ValueOne[] : ValueOne

	type Data = {
		option:OptionsGeneric[number]
		active:boolean
		label:string
		clickHandler: () => void
		key:string
	}[]

	interface $$Props {
		class?:string
		key?:string
		multiple?:MultipleGeneric
		options:OptionsGeneric
		value?:Value<MultipleGeneric>
	}
	

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

	const add = (option:OptionsGeneric[number]) => {
		if (multiple) {
			if (!value || !Array.isArray(value)) {
				value = [option.value]
			} else {
				value = [...value, option.value]
			}
		} else {
			value = option.value
		}
	}

	const remove = (option:OptionsGeneric[number]) => {
		const optionInValue = isOptionInValue(option, value)

		if (multiple) {
			if (!value || !Array.isArray(value)) {
				value = []
			} else if (Array.isArray(value)) {
				if (optionInValue) {
					value = value.filter((val:ValueOne) => getOptionKey({value:val}) !== getOptionKey(option))
				}
			}
		} else {
			if (optionInValue) {
				value = undefined
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

	$: data = options.map((option:OptionsGeneric[number]):Data[number] => {
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

</script>

<slot {data} multiple={multiple}/>
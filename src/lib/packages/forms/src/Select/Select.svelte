<script lang='ts'>
	import { fly } from 'svelte/transition'

	import type { IOption } from './types.js'

	import {generateClassNames, outclick} from '@clue/utils'
	import SelectBase from './SelectBase.svelte'
	import type { ComponentProps } from 'svelte'
	import SelectOptionList from './SelectOptionList.svelte'

	type SelectBaseProps = ComponentProps<SelectBase>

	type T = $$Generic<IOption[]>
	type U = $$Generic<boolean>
	interface $$Props extends ComponentProps<SelectOptionList<T, U>> {
		class?:string
		opened?:boolean
	}
	
	let className = ''
	export { className as class }
	export let opened:$$Props['opened'] = false
	export let options:$$Props['options']
	export let multiple:$$Props['multiple'] = false as U
	export let value:$$Props['value'] = undefined

	let close:SelectBaseProps['close']
	let open:SelectBaseProps['open']
	let toggle:SelectBaseProps['toggle']
	
	const handler = {
		outclick() {
			close?.()
		},
	}

	const getInputValue = (value:$$Props['value']) => {
		if (Array.isArray(value)) {
			return value.join(', ')
		}
		return value
	}

	let inputValue = getInputValue(value)
	$: inputValue = getInputValue(value)
</script>
<small>
	opened: {opened}<br>
	multiple: {multiple}<br>
	value ({typeof value === 'object' ? 'array' : typeof value}): {value}
</small>
<div
	class={generateClassNames(['Select', className])}
	use:outclick
	on:outclick={handler.outclick}
>
	<SelectBase bind:close bind:open bind:toggle bind:value={inputValue} bind:opened />
	{#if opened}
		<div transition:fly={{duration: 200, y: -20}}>
			<SelectOptionList {options} {multiple} bind:value/>
		</div>
	{/if}
</div>

<style lang='sass'>
	.ClueSelect
		:global(.ClueSelectOptionList)
			max-height: min(400px, 80vh)
</style>
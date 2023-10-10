<script lang='ts'>
	import type { IOption } from './types.js'
	import {generateClassNames} from '@clue/utils'
	import SelectOptionListCore from './SelectOptionListCore.svelte'
	import type { ComponentProps } from 'svelte'
	import SelectOption from './SelectOption.svelte'

	type T = $$Generic<IOption<any>[]>
	type U = $$Generic<boolean>

	interface $$Props extends ComponentProps<SelectOptionListCore<T, U>>{
		class?:string
	}
	
	let className = ''
	export { className as class }
	export let options:$$Props['options'] = [] as unknown as T
	export let multiple:$$Props['multiple'] = undefined
	export let value:$$Props['value'] = (multiple ? [] : undefined)
</script>

<SelectOptionListCore {options} bind:value {multiple} let:data {...$$restProps}>
	<ul class={generateClassNames(['SelectOptionList', className])}>
		{#each data as {key, active, label, clickHandler} (key)}
			<SelectOption on:click={clickHandler} {active}>{label}</SelectOption>
		{/each}
	</ul>
</SelectOptionListCore>

<style lang='sass'>
	.ClueSelectOptionList
		background: var(--clue-color-white)
		border-radius: 0 0 10px 10px
		box-shadow: var(--clue-shadow)
		list-style: none
		padding: 12px
		overflow: auto
		:global(.ClueSelectOption)
			width: 100%
</style>
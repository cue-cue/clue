<script lang="ts" context="module">
	export type OptionGenericType = IOption<OptionValue>[]
</script>

<script lang="ts" generics="T extends OptionGenericType">
	import { selectOptionListCoreContext } from './context.js'
	import { generateClassNames } from '@cluue/utils'
	import SelectOption from './SelectOption.svelte'
	import SelectOptionListBase from './SelectOptionListBase.svelte'
	import type { ISelectOptionListCoreData, IOption, OptionValue } from './types.js'
	interface $$Props {
		class?: string
		data?: ISelectOptionListCoreData<T>[]
	}

	let className = ''
	export { className as class }
	export let data: $$Props['data'] = []

	const selectOptionListCoreContextStore = selectOptionListCoreContext.get()

	$: if (selectOptionListCoreContextStore) {
		data = $selectOptionListCoreContextStore.data
	}
</script>

<SelectOptionListBase class={generateClassNames(['SelectOptionList', className])}>
	{#if data}
		{#each data as { key, active, label, clickHandler } (key)}
			<SelectOption on:click={clickHandler} {active}>{label}</SelectOption>
		{/each}
	{/if}
</SelectOptionListBase>

<style lang="sass">
	:global(.ClueSelectOptionList)
		background: var(--clue-color-white)
		border-radius: 0 0 10px 10px
		box-shadow: var(--clue-shadow)
		list-style: none
		padding: 12px
		overflow: auto
		:global(.ClueSelectOption)
			width: 100%
</style>

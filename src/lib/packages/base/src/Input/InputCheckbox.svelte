<script lang="ts">
	import { generateClassNames } from '@clue/utils'
	import { onMount } from 'svelte'
	import type { HTMLInputAttributes } from 'svelte/elements'

	interface $$Props extends Omit<HTMLInputAttributes, 'type' | 'value'> {
		class?: string
		type?: Extract<HTMLInputAttributes['type'], 'checkbox' | 'radio'>
		group: (string | number)[]
		value: string
	}

	let className = ''
	export { className as class }

	export let checked: $$Props['checked'] = undefined
	export let group: $$Props['group'] = []
	export let value: $$Props['value']

	const onChange = () => {
		const index = group.indexOf(value)

		if (checked === undefined) checked = index >= 0

		if (checked) {
			if (index < 0) {
				group.push(value)
				group = group
			}
		} else {
			if (index >= 0) {
				group.splice(index, 1)
				group = group
			}
		}
	}

	const init = (node: HTMLInputElement, _group: typeof group) => {
		const update = (_group: typeof group) => {
			checked = _group.includes(value)
		}
		if (checked === undefined) update(_group)

		onChange()

		return {
			update
		}
	}
	onMount(() => {
		onChange()
	})
</script>

<input
	class={generateClassNames(['InputCheckbox', className])}
	use:init={group}
	type="checkbox"
	bind:checked
	on:keyup
	on:keydown
	on:keypress
	on:focus
	on:blur
	on:click
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:paste
	on:change={onChange}
	on:change
	{value}
	{...$$restProps}
/>

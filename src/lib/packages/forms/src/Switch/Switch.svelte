<script lang="ts">
	import { generateClassNames } from '@cluue/utils'
	import type { ComponentProps } from 'svelte'
	import { Label } from '../Label/index.js'
	import type LabelName from '../Label/LabelName.svelte'
	import { fieldContext } from '../FieldContext/index.js'
	import { writable } from 'svelte/store'
	import SwitchBase from './SwitchBase.svelte'

	interface $$Props extends ComponentProps<SwitchBase> {
		class?: string
	}

	interface $$Slots {
		default: {
			Label: typeof LabelName
		}
		desc: object
	}

	let className = ''
	export { className as class }
	export let group: $$Props['group'] = undefined
	export let checked: $$Props['checked'] = undefined
	export let disabled: $$Props['disabled'] = undefined
	export let id: $$Props['id'] = undefined
	export let name: $$Props['name'] = undefined
	export let value: $$Props['value'] = undefined

	const fieldContextStore = fieldContext.set(writable({ id, name, disabled }))
	$: fieldContextStore.set({ id, name, disabled })
</script>

<Label
	class={generateClassNames(['Switch', className])}
	slots={{
		label: $$slots.default,
		desc: $$slots.desc,
	}}
>
	<SwitchBase {disabled} {value} bind:checked bind:group bind:id {name} {...$$restProps} />
	<svelte:fragment slot="label" let:Component>
		<slot Label={Component} />
	</svelte:fragment>
	<svelte:fragment slot="desc">
		<slot name="desc" />
	</svelte:fragment>
</Label>

<script lang="ts">
	import { generateClassNames } from '@cluue/utils'
	import type { ComponentProps } from 'svelte'
	import { Label } from '../Label/index.js'
	import CheckboxBase from './CheckboxBase.svelte'
	import type LabelName from '../Label/LabelName.svelte'
	import { fieldContext } from '../FieldContext/index.js'
	import { writable } from 'svelte/store'

	interface $$Props extends ComponentProps<CheckboxBase> {
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
	export let group: $$Props['group'] = []
	export let checked: $$Props['checked'] = undefined
	export let disabled: $$Props['disabled'] = undefined
	export let id: $$Props['id'] = undefined
	export let name: $$Props['name'] = undefined
	export let value: $$Props['value'] = ''
	export let manual: $$Props['manual'] = undefined

	const fieldContextStore = fieldContext.set(writable({ id, name, disabled, manual }))
	$: fieldContextStore.set({ id, name, disabled, manual })
</script>

<Label
	class={generateClassNames(['Checkbox', className])}
	slots={{
		label: $$slots.default,
		desc: $$slots.desc,
	}}
>
	<CheckboxBase {value} {disabled} bind:checked bind:group bind:id {name} {...$$restProps} />
	<svelte:fragment slot="label" let:Component>
		<slot Label={Component} />
	</svelte:fragment>
	<svelte:fragment slot="desc">
		<slot name="desc" />
	</svelte:fragment>
</Label>

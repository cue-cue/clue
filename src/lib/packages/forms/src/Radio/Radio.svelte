<script lang='ts'>
	import {generateClassNames} from '@cluue/utils'
	import type { ComponentProps } from 'svelte';
	import { Label } from '../Label/index.js'
	import type LabelName from '../Label/LabelName.svelte'
	import RadioBase from './RadioBase.svelte'
	import { fieldContext } from '../FieldContext/index.js'
	import { writable } from 'svelte/store'

	interface $$Props extends ComponentProps<RadioBase> {
		class?:string
	}

	interface $$Slots {
		default: {
			label: typeof LabelName
		}
		desc: {}
	}

	let className = ''
	export { className as class }
	export let group:$$Props['group'] = undefined
	export let disabled:$$Props['disabled'] = undefined
	export let id:$$Props['id'] = undefined
	export let name:$$Props['name'] = undefined
	export let value:$$Props['value'] = undefined
	
	const fieldContextStore = fieldContext.set(writable({id, name, disabled}))
	$: fieldContextStore.set({id, name, disabled})
</script>

<Label
	class={generateClassNames(['Checkbox', className])}
	slots={{
		label: $$slots.default,
		desc: $$slots.desc
	}}
>
	<RadioBase {disabled} {value} bind:group bind:id {name} {...$$restProps}/>
	<svelte:fragment slot='label' let:component>
		<slot label={component}/>
	</svelte:fragment>
	<svelte:fragment slot='desc'>
		<slot name='desc'/>
	</svelte:fragment>
</Label>
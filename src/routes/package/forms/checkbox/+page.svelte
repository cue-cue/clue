<script lang="ts">
	import { randomId } from '@cluue/utils'
	import { Checkbox, Radio, Switch } from '@cluue/forms'
	import type { ComponentProps, ComponentType } from 'svelte'

	const items: (Omit<ComponentProps<Checkbox>, 'value' | 'id' | 'group'> & {
		component: ComponentType
		id: string
		label?: string
	})[] = [
		{
			id: 'Base',
			component: Checkbox
		},
		{
			id: 'Label',
			label: 'Lorem ipsum',
			component: Checkbox
		},
		{
			id: 'Radio',
			component: Radio
		},
		{
			id: 'Radio + label',
			label: 'Lorem ipsum',
			component: Radio
		},
		{
			id: 'Switch',
			component: Switch
		},
		{
			id: 'Switch + label',
			label: 'Lorem ipsum',
			component: Switch
		}
	]

	const genVariants = (params: Omit<(typeof items)[0], 'id'>) => {
		const name = randomId()
		return [
			{
				...params,
				name,
				value: 'default'
			},
			{
				...params,
				name,
				value: 'checked',
				checked: true
			},
			{
				...params,
				name,
				value: 'disabled',
				disabled: true
			},
			{
				...params,
				name,
				value: 'checked + disabled',
				// checked: true,
				disabled: true
			}
		]
	}

	let groups = items.reduce<Partial<Record<string, string[] | string>>>((val, { id, component, ...all }) => {
		val[id] = component.name === Radio.name ? 'checked + disabled' : ['checked + disabled']
		return val
	}, {})
</script>

<ul>
	{#each items as { id, ...item } (id)}
		<li>
			<h4>{id}: <small>{groups[id]}</small></h4>
			<ul style="display: flex; gap: 30px">
				{#each genVariants(item) as { component, label, value, ...props } (value)}
					<li>
						<h5 style="margin: 0; margin-bottom: 10px">{value}</h5>
						<svelte:component this={component} bind:group={groups[id]} {...props} {value} let:Label={LabelComponent}>
							{#if label}
								<svelte:component this={LabelComponent}>{label}</svelte:component>
							{/if}
						</svelte:component>
					</li>
				{/each}
			</ul>
		</li>
	{/each}
</ul>

<script lang="ts">
	import type { IOption } from '$lib/packages/forms/src/Select/types.js'
	import { Select } from '@cluue/forms'
	import type { ComponentProps } from 'svelte'

	/* eslint-disable @typescript-eslint/no-explicit-any */
	const items: (ComponentProps<Select<IOption<string>[], any, any, boolean>> & { id: string })[] =
		[
			{
				id: 'Base',
				options: [
					{
						value: 'test',
						label: 'test',
					},
					{
						value: 'test1',
						label: 'test1',
					},
					{
						value: 'test2',
						label: 'test2',
					},
					{
						value: 'test3',
						label: 'test3',
					},
				],
			},
		]
</script>

<h2>Select</h2>

<ul class="list">
	{#each items as { id, ...item } (id)}
		<li>
			<h3>{id}</h3>
			<ul>
				<li>
					<Select {...item} />
				</li>
				<li>
					<Select {...item} multiple value={[]} allowSearch={true} />
				</li>
			</ul>
			<ul>
				<li>
					<Select options={[{ value: 0, label: '' }]} multiple={false} value={0} />
				</li>
				<li>
					<Select {...item} disabled multiple={true} value={[]} allowSearch={true} />
				</li>
			</ul>
			<ul>
				<li>
					<Select {...item} error />
				</li>
				<li>
					<Select {...item} multiple value={['test2', 'test3']} error />
				</li>
			</ul>
			<ul>
				<li>
					<Select {...item} error disabled />
				</li>
				<li>
					<Select {...item} readonly error />
				</li>
			</ul>
			<ul>
				<li>
					<Select {...item} label="label" />
				</li>
				<li>
					<Select {...item} helper="helper" label="label" />
				</li>
			</ul>
			<ul>
				<li>
					<Select
						options={item.options.map(({ value, label }, index) => ({
							value: {
								id: value,
								name: (label || '') + index,
							},
							label,
						}))}
						key="name"
						valueType="key"
						value={['test2']}
						multiple
					/>
				</li>
				<li>
					<Select
						options={item.options.map(({ value, label }, index) => ({
							value: {
								id: index + value,
								name: index,
							},
							label,
						}))}
						valueType="advanced"
						value={[{ id: '1test21', name: 1 }]}
						multiple
					/>
				</li>
			</ul>
		</li>
	{/each}
</ul>

<style lang="sass">
    .list
        margin-bottom: 400px
    ul
        li
            ul
                width: calc(100% - 60px)
                display: flex
                li
                    width: 100%
                    &:not(:last-child)
                        margin-right: 20px

</style>

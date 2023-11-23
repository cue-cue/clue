<script lang="ts">
	import TextFieldButton from '$lib/packages/forms/src/TextField/TextFieldButton.svelte'
	import { Input, PasswordField, TextField, TextFieldBase } from '@cluue/forms'
	import buttonIcon from '@cluue/icons/line/activity-circle.svg?clue'
	import type { ComponentProps } from 'svelte'

	const icons: Record<'start' | 'end', (typeof buttonIcon | undefined)[]> = {
		start: [buttonIcon, buttonIcon],
		end: [buttonIcon, buttonIcon, buttonIcon]
	}

	const items: Array<ComponentProps<TextField> & { id: string }> = [
		{
			id: 'Base'
		},
		{
			id: 'Size: small',
			size: 'small'
		},
		{
			id: 'Textarea',
			rows: 3,
			multiline: true
		},
		{
			id: 'Textarea | Size: small',
			size: 'small',
			rows: 4,
			multiline: true
		}
	]

	const getVariants = <T extends ComponentProps<TextField>>(
		props: T
	): Array<T & { id: string }> => {
		const variants: ComponentProps<TextField>[] = [
			{ value: 'Value' },
			{ placeholder: 'Placeholder' },
			{ value: 'Placeholder', placeholder: 'Placeholder' },
			{ focused: true, placeholder: 'Placeholder' },
			{ error: true, placeholder: 'Placeholder' },
			{ disabled: true, placeholder: 'Placeholder' },
			{ disabled: true, error: true, placeholder: 'Placeholder' },
			{ disabled: true, readonly: true, placeholder: 'Placeholder' },
			{ readonly: true, placeholder: 'Placeholder' },
			{ readonly: true, error: true, placeholder: 'Placeholder' },
			{ readonly: true, disabled: true, placeholder: 'Placeholder' },
			{ readonly: true, disabled: true, error: true, placeholder: 'Placeholder' },
			{
				readonly: true,
				label: 'Label',
				helper: 'Helper',
				hint: 'Hint',
				placeholder: 'Placeholder'
			},
			{
				disabled: true,
				label: 'Label',
				helper: 'Helper',
				hint: 'Hint',
				placeholder: 'Placeholder'
			},
			{ error: true, label: 'Label', helper: 'Helper', hint: 'Hint', placeholder: 'Placeholder' },
			{
				readonly: true,
				disabled: true,
				error: true,
				label: 'Label',
				helper: 'Helper',
				hint: 'Hint',
				placeholder: 'Placeholder'
			}
		]

		return variants.map((variant, i) => ({ ...props, ...variant, id: `variant-${i}` }))
	}
</script>

<h2>Input</h2>
<ul class="item-list">
	{#each items as { id, ...item } (id)}
		<li>
			<h3>{id}</h3>
			<ul class="variant-list">
				{#each getVariants(item) as { id, ...variant } (id)}
					<li>
						<pre style="font-size: 10px">{JSON.stringify(variant, null, 2)}</pre>
						<TextField {...variant} />
					</li>
				{/each}
				<TextField {...item} label="Buttons (start)" placeholder="Buttons">
					<svelte:fragment slot="buttons-start">
						<TextFieldButton icon={buttonIcon} />
					</svelte:fragment>
				</TextField>
				<TextField {...item} label="Buttons (end)" placeholder="Buttons">
					<svelte:fragment slot="buttons">
						<TextFieldButton icon={buttonIcon} />
					</svelte:fragment>
				</TextField>
				<TextField {...item} label="Buttons (start + end)" placeholder="Click!!!">
					<svelte:fragment slot="buttons-start">
						{#each icons.start as icon, index}
							{#if icon}
								<TextFieldButton
									{icon}
									on:click={() => {
										icons.start[index] = undefined
										setTimeout(() => (icons.start[index] = buttonIcon), 2000)
									}}
								/>
							{/if}
						{/each}
					</svelte:fragment>
					<svelte:fragment slot="buttons">
						{#each icons.end as icon, index}
							{#if icon}
								<TextFieldButton
									{icon}
									on:click={() => {
										icons.end[index] = undefined
										setTimeout(() => (icons.end[index] = buttonIcon), 2000)
									}}
								/>
							{/if}
						{/each}
					</svelte:fragment>
				</TextField>
			</ul>
		</li>
	{/each}
</ul>

<style lang="sass">
    .item-list
        padding-left: 0
        & > li
            margin-bottom: 60px
    .variant-list
        padding-left: 0
        display: grid
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))
        gap: 16px
        align-items: end
        list-style: none
</style>

<script lang='ts'>
	import {generateClassNames} from '@clue/utils'
	import type { ComponentProps } from 'svelte';
	import { TextFieldButton, TextFieldBase, TextField } from '../index.js';
	import eye from '@clue/icons/line/eye.svg'
	import calendar from '@clue/icons/line/calendar.svg'

	interface $$Props extends Pick<ComponentProps<TextFieldBase>, 'type'> {
		class?:string
		visible?:boolean
	}
	
	let className = ''
	export { className as class }
	export let visible:$$Props['visible'] = false

	export const show = () => {
		visible = true
	}

	export const hide = () => {
		visible = false
	}

	export const toggle = () => {
		visible = !visible
	}

	const handler = {
		changeClick() {
			toggle()
		}
	}
</script>

<TextField class={generateClassNames(['PasswordField', className])}>
	<svelte:fragment slot='base'>
		<TextFieldBase type={visible ? 'text' : 'password'} {...$$restProps}>
			<svelte:fragment slot='buttons'>
				<TextFieldButton
					icon={visible ? calendar : eye}
					on:click={handler.changeClick}
				/>
			</svelte:fragment>
		</TextFieldBase>
	</svelte:fragment>
</TextField>

<style lang='sass'>
	.CluePasswordField
</style>
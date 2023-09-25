<script lang='ts'>
	import {generateClassNames} from '@clue/utils'
	import TextField from '../TextField/TextField.svelte';
	import TextFieldBase from '../TextField/TextFieldBase.svelte';
	import type { ComponentProps } from 'svelte';

	interface $$Props extends Pick<ComponentProps<TextFieldBase>, 'type'> {
		class?:string
		type?:'text' | 'password'
	}
	
	let className = ''
	export { className as class }
	export let type:$$Props['type'] = 'password'

	const setType = (newType:typeof type) => {
		type = newType
	}

	export const show = () => {
		setType('text')
	}

	export const hide = () => {
		setType('password')
	}

	export const change = () => {
		switch (type) {
			case 'password': {
				show()
				break
			}
			case 'text': {
				hide()
				break
			}
		}
	}

	const handler = {
		changeClick() {
			change()
		}
	}

	
</script>

<TextField class={generateClassNames(['PasswordField', className])}>
	<svelte:fragment slot='base'>
		<TextFieldBase {type} {...$$restProps}></TextFieldBase>
		<button on:click={handler.changeClick}>change</button>
	</svelte:fragment>
</TextField>

<style lang='sass'>
	.CluePasswordField
</style>